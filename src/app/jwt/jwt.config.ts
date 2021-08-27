export function tokenGetter(): any {
    return 'Bearer ' + localStorage.getItem("token");
}