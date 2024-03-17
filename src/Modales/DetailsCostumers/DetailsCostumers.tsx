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
      <MDBContainer className="py-5" style={{ backgroundColor:"rgba(299,299,299,0.2)"}}>
        <MDBRow>
          <MDBCol lg="3">
            <MDBCard className="mb-4 image-card" style={{backgroundColor:"rgb(2,2,2,0.0)"}}>
              <MDBCardBody className="text-center" style={{backgroundColor:'rgba(266,266,266,0.0)', borderRadius: 200}}>
                <MDBCardImage
                  src="https://th.bing.com/th/id/OIG4.o2w6LTpri23MMRavBLon?w=1024&h=1024&rs=1&pid=ImgDetMain"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '200px'}}
                  fluid
                />
                <p style={{color:"white", fontWeight:"bold"}}>{userData.name}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol >
            <MDBCard style={{width:"112%", marginTop:"7%"}}>
              <MDBCardBody >
                <MDBRow  >
                  <MDBCol  >
                    <MDBCardText style={{fontStyle: "oblique", marginLeft:-12, fontWeight: "bold", marginTop:"2%" }}>Nombre:</MDBCardText>
                  </MDBCol>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "italic", fontFamily:"cursive", marginLeft:"0%"}}>{userData?.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "oblique", marginLeft:-12, fontWeight: "bold", marginTop:"2%" }}>Apellido:</MDBCardText>
                  </MDBCol>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "italic", fontFamily:"cursive", marginLeft:"0%"}}>{userData?.user?.lastname}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "oblique", marginLeft:-12, fontWeight: "bold", marginTop:"2%"}}>Documento:</MDBCardText>
                  </MDBCol>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "italic", fontFamily:"cursive", marginRight:"0%"}}>{userData?.document} {userData?.documentType}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "oblique", marginLeft:-12, fontWeight: "bold" , marginTop:"2%"}} >Correo:</MDBCardText>
                  </MDBCol>
                  <MDBCol >
                  <MDBCardText style={{fontStyle: "italic", fontFamily:"cursive", marginRight:"0%"}}>{userData?.user?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "oblique", marginLeft:-12, fontWeight: "bold", marginTop:"2%" }}>Telefono:</MDBCardText>
                  </MDBCol>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "italic", fontFamily:"cursive", marginRight:"0%"}}>{userData?.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "oblique", marginLeft:-12, fontWeight: "bold", marginTop:"2%" }}>Dirección:</MDBCardText>
                  </MDBCol>
                  <MDBCol >
                    <MDBCardText style={{fontStyle: "italic", fontFamily:"cursive", marginRight:"0%"}}>{userData?.address}</MDBCardText>
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
