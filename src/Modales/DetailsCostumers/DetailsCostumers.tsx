import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.tsx";
import {API_KEY, API_URL} from "../../constantes.ts";


import './DetailsCss.css';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';


export const UserProfileComponent= ({setIsModalOpen, title = 'Informacion del usuario', idUser}: { setIsModalOpen: (value: boolean) => void, title?: string, idUser: number}) => {
    console.log("UserProfileComponent - User ID:", idUser);
    const [userData, setUserData] = useState<any>({});
    const {data, get} = useFetch(API_URL)
    useEffect(() => {
        get(`coustumers/${idUser}?apikey=${API_KEY}`);
    }, [idUser]);

    useEffect(() => {
        if(data?.coustomers){
            setUserData(data?.coustomers)
        }
    }, [data]);
     console.log("UserProfileComponent - User Data:", userData);

     

    return (
        <ModalContainer ShowModal={setIsModalOpen}>
            <Modal showModal={setIsModalOpen} title={title}>
            <section className='profile-section'>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4 image-card">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p>{userData.name}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4 info-card">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nombre:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText>{userData?.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Documento:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText>{userData?.document} {userData?.documentType}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Telefono:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText>{userData?.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText>{userData?.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            {/* ... (resto del código) ... */}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
            </Modal>
        </ModalContainer>
    );
};
