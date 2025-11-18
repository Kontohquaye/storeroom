export const USER_QUERY_BY_EMAIL = `*[_type == "user" && email == $email][0]`;
export const AUTHOR_BY_GMAIL_ID_QUERY = `*[_type == "user" && id == $id][0]`;
