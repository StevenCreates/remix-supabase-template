import supabase from "~/utils/supabase";
import {getSession} from '~/utils/cookies'
import {redirect} from '@remix-run/node'


export default (fn) => async (context) => {
    const session = await getSession(context.request.headers.get('Cookie'))
    const accessToken = session.get('accessToken')
    const {user } = await supabase.auth.api.getUser(accessToken)

    if (!user) {
        return redirect('/login')
    }

    supabase.auth.setAuth(accessToken);

    return await fn({
        ...context,
        user,
        accessToken,
        supabase,
    })
}