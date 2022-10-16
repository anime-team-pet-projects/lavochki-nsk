import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login';
import usersApi from "@/api/users/users.api";
import TheHeaderMenu from "@/components/TheHeader/TheHeaderMenu";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .auth {
    display: flex;
    align-items: center;

    &__title {
      margin-right: 8px;
    }
    
    &__avatar {
      width: 50px;
      height: 50px;
      
      img {
        border-radius: 50%;
      }
    }
  }
`

const handleTelegramResponse = async (response: any): Promise<void> => {
    const [error, data] = await usersApi.loginViaTelegram(response)

    if (!error && data) {
       localStorage.setItem('token', data.access)

        location.reload()
    }
};

const handleLogout = (): void => {
    localStorage.clear()

    location.reload()
}

const TheHeader = (): any => {
    const [isAuth, setIsAuth] = useState(false)
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            setIsAuth(true)
        }
    }, [])

    return (
        <StyledHeader>
            <div className="logo">logo</div>
            <div className="auth">
                <button onClick={() => setShowModal(true)}>show Modal</button>
                {showModal && (
                    <TheHeaderMenu className={'the-header-menu'} setShowModal={() => setShowModal(false)} />
                )}
                { !isAuth
                    ? ( <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={process.env.BOT_USERNAME} /> )
                    : <button onClick={handleLogout}>Выйти</button>}

            </div>
        </StyledHeader>
    );
};

export default TheHeader;

