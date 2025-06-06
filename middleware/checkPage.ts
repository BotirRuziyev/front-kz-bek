export default function ({ route, app }: any) {
    const validRoutes = app.router?.options?.routes?.map((r: any) => r.path) || [];

    if (!validRoutes.includes(route.path)) {
        // return redirect('/404');
    }
}
