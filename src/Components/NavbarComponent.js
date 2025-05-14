import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import '../Styles/navbar.css'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NavbarComponent() {
    const { userInfo } = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(userInfo)
    }, [])

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={() => navigate('/')}>
                    VersionOne
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate('/paths')}>
                            Paths
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {!userInfo && (
                            <Nav>
                                <Button
                                    variant="light"
                                    onClick={() => navigate('/login')}
                                >
                                    Log In
                                </Button>
                                <Button
                                    variant="primary"
                                    className="btn-primary"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign Up
                                </Button>
                            </Nav>
                        )}

                        {userInfo && (
                            <NavDropdown
                                title="Account"
                                id="collapsible-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    href="#action/3.1"
                                    onClick={() =>
                                        navigate('/account/settings')
                                    }
                                >
                                    Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#action/3.2"
                                    onClick={() => navigate('/account/logout')}
                                >
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent
