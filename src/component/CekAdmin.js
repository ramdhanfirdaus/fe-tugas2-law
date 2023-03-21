import React, {useState} from 'react'
import UserService from "../service/UserService";

const CekAdmin = () => {
    const [password, setPassword] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);

    const login = async () => {
        try {
            await UserService.postPasswordAdmin(password);
            document.location.reload()
        } catch (e) {
            setWrongPassword(true)
        }
    }

    return (
        <>
            {wrongPassword &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    <button type="button" className="btn-close" onClick={() => setWrongPassword(false)}></button>
                </div>
            }
            <div className="container">
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-sm-6 col-lg-4'>
                        <div className="card text-center register" style={{width: '24rem'}}>
                            <div className="card-header">
                                <img src={'logo192.png'} style={{width: "1rem"}}/> Login Admin <img src={'logo192.png'} style={{width: "1rem"}}/>
                            </div>
                            <div className="card-body">
                                <div className="input-group p-3">
                                    <input type="password" className="form-control"
                                           id="user-name"
                                           placeholder="Enter password"
                                           name="userName"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           margin="normal"/>
                                    <button type="button" className="rounded-end" onClick={() => login()}>
                                        Masuk
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'></div>
                </div>
            </div>
        </>
    )
}

export default CekAdmin