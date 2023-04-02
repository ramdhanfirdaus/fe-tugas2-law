import React, {useEffect, useState} from 'react'
import UserService from "../service/UserService";
import { useNavigate  } from "react-router-dom";

const AllUser = () => {
    let navigate  = useNavigate();
    const [user, setUser] = useState([]);
    const [info, setInfo] = useState("Loading...");

    useEffect(() => {
        const getApi = async () => {
            setUser(await UserService.getAllUserPrivateChatroom())
            setInfo("Tidak ada user pada sistem")
        }
        getApi()
    }, [])

    const cekMessage = (nama) => {
        navigate('/message/' + nama)
    }

    return (
        <div className="container">
            {(user.length === 0) ? (
                <div className='row'>
                        <div className='col-lg-4'></div>
                        <div className='col-sm-6 col-lg-4'>
                            <div className="card text-center register" style={{width: '24rem'}}>
                                <div className="card-header">
                                    <img src={'logo192.png'} style={{width: "1rem"}} alt="..."/> Alert <img src={'logo192.png'} style={{width: "1rem"}} alt="..."/>
                                </div>
                                <div className="card-body">
                                    <div className="card-body">
                                        <p>{info}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'></div>
                    </div>
            ) : (
                <div className="row my-5">
                    {user.map(function(nama, i){
                        return <div key={nama} className="col-3">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="my-auto">User {i+1}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Nama: {nama}</p>
                                    <div className="text-center">
                                        <button type="button" className="btn btn-sm btn-success rounded-1"
                                        onClick={() => cekMessage(nama)}>
                                            Cek Pesan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            )}
        </div>
    )
}

export default AllUser