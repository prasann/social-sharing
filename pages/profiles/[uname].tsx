import {useEffect, useState} from "react";
import {User} from "../api/user";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";

function Profile() {

    const router = useRouter()
    const {uname} = router.query

    const [data, setData] = useState<User>({name: "", bio: ""})
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/user/${uname}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [uname])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <div>
            <Head>
                <title>{uname?.toString()}</title>
                <meta property="og:title" content={`${ data.name } - GitHub Profiler`} />
                <meta property="og:description" content={`${ data.bio }`} />
                <meta property="og:image:width" content="2024" />
                <meta property="og:image:height" content="1012" />
            </Head>
            <h1>{data.name}</h1>

            <Link href={"/"}>Back</Link>
        </div>
    )
}

export default Profile
