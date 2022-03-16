import {useEffect, useState} from "react";
import {User} from "../api/user";
import {useRouter} from "next/router";
import Link from "next/link";

function Profile() {

    const router = useRouter()
    const {uname} = router.query

    const [data, setData] = useState<User>({name: ""})
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
            <h1>{data.name}</h1>

            <Link href={"/"}>Back</Link>
        </div>
    )
}

export default Profile
