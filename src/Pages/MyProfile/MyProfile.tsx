import {Container} from "../../components/Container/Container.tsx";
import styles from './MyProfile.module.css';
import {Titles} from "../../components/Titles/Titles.tsx";
import {useAuth} from "../../context/AuthContext.tsx";

import ImageProfile from '../../assets/userImage.png'
import {Button} from "../../components/Button/Button.tsx";

export const MyProfile = () => {
    const {user} = useAuth();
    return (
        <Container justify={'CENTER'} align={'CENTER'}>
            <div className={styles['myProfile__container']}>
                <Titles title={'Mi perfil'} level={1} transform={'UPPERCASE'}/>
                <Container justify={'CENTER'} align={'CENTER'} direction={'ROW'} gap={2} className={styles['myProfileDataContainer']}>
                    <div className={styles['myProfile__image']}>
                        <img src={ImageProfile} alt=""/>
                    </div>
                    <div className={styles['myProfile__data']}>
                        <div className={styles['myProfile__data--item']}>
                            <Titles title={'Nombre'} level={4}/>
                            <p>{user?.name}</p>
                        </div>
                        <div className={styles['myProfile__data--item']}>
                            <Titles title={'Dirección'} level={4}/>
                            <p>{user?.address || 'Cualquier cosa'}</p>
                        </div>
                        <div className={styles['myProfile__data--item']}>
                            <Titles title={'Teléfono'} level={4}/>
                            <p>{user?.phone || '123456789'}</p>
                        </div>
                        <div className={styles['myProfile__data--item']}>
                            <Titles title={'Email'} level={4}/>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </Container>
                <Button text={'Editar perfil'} autosize={false}  fill={false} onClick={() => {} }/>
            </div>
        </Container>
    )
}