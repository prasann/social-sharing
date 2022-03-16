import {useEffect, useState} from "react";
import {User} from "../api/user";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import {TwitterIcon, TwitterShareButton} from "react-share";
import styles from "../../styles/Home.module.css";

function Profile() {

    const router = useRouter()
    const {uname} = router.query

    const [data, setData] = useState<User | undefined>(undefined)
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
                <meta property="og:url" content={`https://social-sharing-tawny.vercel.app/profiles/${uname}`}/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={`${data.name}         - Github Profiler`}/>
                <meta property="og:description" content={`${data.bio}`}/>
                <meta property="og:image" content={`https://social-sharing-tawny.vercel.app/${data.name}`}/>
            </Head>
            <main className={styles.main}>
                <h1>{data.name}</h1>
                <TwitterShareButton title={`${data.name}         - Github Profiler`}
                                    url={`https://social-sharing-tawny.vercel.app/profiles/${uname}`}
                                    hashtags={["#developer"]}
                                    related={["pvenk"]}>
                    <div className={styles.card}>Share my profile on <TwitterIcon size={32} round={true}/></div>
                </TwitterShareButton>
                <div>
                    <Link href={"/"}>Back</Link>
                </div>
            </main>
        </div>
    )
}

export default Profile
