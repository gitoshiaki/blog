export default function ({ store, redirect }) {
    if (process.browser) {
        // ユーザーが認証されていないとき
        if (localStorage.getItem('session') === null) {
            return redirect('/signin')
        }
    }
}