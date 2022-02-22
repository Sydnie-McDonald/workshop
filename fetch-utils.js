const SUPABASE_URL = 'https://gmpyleofggphhfqygglb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtcHlsZW9mZ2dwaGhmcXlnZ2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzNDE0NTEsImV4cCI6MTk1OTkxNzQ1MX0.aAoG-W_B2pk78Kdb54K8sM3SQbO0g1kbGUOtqvvQhXA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../create');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./create');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}
////////////////////////////////////////////////////////////////////////////////////////////
// getParticipants // getWorkshops // renderWorkshopsData
export async function getWorkshops() {
    // this will only grab items that belong to this user thanks to RLS and user_id property
    const response = await client
        .from('workshops').select('*, participants(*)');
    console.log(response);
    return checkError(response);
}

export async function createParticipant(name, workshop_id) {
    const response = await client
        .from('participants')
        .insert({
            name: name,
            workshop_id: workshop_id,
            user_id: client.auth.user().id,
        })
        .single();

    return checkError(response);
}
