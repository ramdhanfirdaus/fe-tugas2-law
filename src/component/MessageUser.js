import React, {useEffect, useState} from 'react'
import { useParams  } from "react-router-dom";
import ChatService from "../service/ChatService";

const AllUser = () => {
    const [message, setMessage] = useState([]);
    let { nama } = useParams();

    useEffect(() => {
        const getApi = async () => {
            setMessage(await ChatService.getPrivateChatByUser(nama))
        }
        getApi()
    }, [nama])

    return (
        <div className="container">
            {(message.length === 0) ? (
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-sm-6 col-lg-4'>
                        <div className="card text-center register" style={{width: '24rem'}}>
                            <div className="card-header">
                                <img src={'logo192.png'} style={{width: "1rem"}}/> Alert <img src={'logo192.png'} style={{width: "1rem"}}/>
                            </div>
                            <div className="card-body">
                                <div className="card-body">
                                    <p>Tidak message dengan user bernama {nama}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'></div>
                </div>
            ) : (
                <>
                    <h2 className="mt-5">Message atas nama <strong>{nama}</strong></h2>
                    <div className="row my-3">
                        {message.map(function(message, i){
                            return <div key={message.id} className="col-3 my-2">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="my-auto">Message {i+1}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Sender Name: {message.senderName}</p>
                                        <p className="card-text">Receiver Name: {message.receiverName}</p>
                                        <p className="card-text">Message: {message.message}</p>
                                        <p className="card-text">Tanggal: { }
                                            {message.date.substring(8, 10)}-
                                            {message.date.substring(5, 7)}-
                                            {message.date.substring(0, 4)}</p>
                                        <p className="card-text">Pukul: { }
                                            {message.date.substring(11, 13)}.
                                            {message.date.substring(14, 16)}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default AllUser