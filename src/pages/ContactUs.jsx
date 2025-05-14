import Header from '../components/Header';
import "../index.css";
import Container from '@mui/material/Container';
import building from '../assets/images/building.png';
import mail from '../assets/images/mail.png';
import smartphone from '../assets/images/smartphone.png';
export default function ContactUs() {
    return(
        <>
            {/* <Header /> */}
            <Container maxWidth="sm">
                <p className="text-center mt-16 text-2xl">ติดต่อเรา</p>
                <div className="w-full h-96 bg-white rounded-md inner-shadow mt-10 p-5">
                    <div className="grid grid-cols-2">
                        <div>
                            <img src={building} alt="building" width="50" className='ml-8' />
                        </div>
                       <div >
                         <p className="contact-text mt-10">บริษัท ไมโครกรีนเทค จำกัด</p>
                       </div>

                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <img src={mail} alt="mail" width="80" className="mt-8 ml-3" />
                        </div>
                        <div>
                            <p className="contact-text mt-10">support@microgreen <br /> tech.net</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <img src={smartphone} alt="smartphone" width="100" className="mt-5" />
                        </div>
                        <div>
                            <p className="contact-text mt-12">0875585454</p>
                        </div>
                    </div>
                </div>

            </Container>
        </>
    )
}
