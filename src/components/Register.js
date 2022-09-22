import 'react-dropdown/style.css';
import React from 'react';
import agent from '../Network';
import { connect } from 'react-redux';
import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';
import * as PropTypes from "prop-types";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onChangeUsername: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'userName', value }),
    onChangeFirstname: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'firstName', value }),
    onChangeLastname: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'lastName', value }),
    onChangeRole: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'roleName', value }),
    onSubmit: (firstName, lastName, username, email, password, role) => {
        const payload = agent.Auth.register(firstName, lastName, username, email, password, role);
        dispatch({ type: REGISTER, payload })
    },
    onUnload: () =>
        dispatch({ type: REGISTER_PAGE_UNLOADED })
});

function Copyright(props) {
    return null;
}

Copyright.propTypes = {sx: PropTypes.shape({mt: PropTypes.number})};

class Register extends React.Component {
    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        this.changeFirstname = ev => this.props.onChangeFirstname(ev.target.value);
        this.changeLastname = ev => this.props.onChangeLastname(ev.target.value);
        this.changeRole = ev => {
            debugger
            this.props.onChangeRole(ev.target.value);
        }
        this.submitForm = (firstName, lastName, username, email, password, role) => ev => {
            ev.preventDefault();
            this.props.onSubmit(firstName, lastName, username, email, password, role);
        }
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
        const username = this.props.userName;
        const role = this.props.roleName;
        const firstName = this.props.firstName;
        const lastName = this.props.lastName;

        const ROLES = ["TEACHER", "STUDENT"]
        const theme = createTheme();

        function Copyright(props) {
            return (
                <Typography variant="body2" color="text.secondary" align="center" {...props}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://mui.com/">
                        Your Website
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            );
        }
        return (
            // <div className="auth-page">
            //     <div className="container page">
            //         <div className="row">
            //
            //             <div className="col-md-6 offset-md-3 col-xs-12">
            //                 <h1 className="text-xs-center">Sign Up</h1>
            //                 <p className="text-xs-center">
            //                     <Link to="/login">
            //                         Have an account?
            //                     </Link>
            //                 </p>
            //
            //                 {/*<ListErrors errors={this.props.errors} />*/}
            //
            //                 <form onSubmit={this.submitForm(username, email, password, role)}>
            //                     <fieldset>
            //
            //                         <fieldset className="form-group">
            //                             Username:
            //                             <input
            //                                 className="form-control form-control-lg"
            //                                 type="text"
            //                                 placeholder="Username"
            //                                 value={this.props.username}
            //                                 onChange={this.changeUsername} />
            //                         </fieldset>
            //
            //                         <fieldset className="form-group">
            //                             Email:
            //                             <input
            //                                 className="form-control form-control-lg"
            //                                 type="email"
            //                                 placeholder="Email"
            //                                 value={this.props.email}
            //                                 onChange={this.changeEmail} />
            //                         </fieldset>
            //
            //                         <fieldset className="form-group">
            //                             Password:
            //                             <input
            //                                 className="form-control form-control-lg"
            //                                 type="password"
            //                                 placeholder="Password"
            //                                 value={this.props.password}
            //                                 onChange={this.changePassword} />
            //                         </fieldset>
            //
            //                         <fieldset className="form-group">
            //                             Role:
            //                             <Dropdown options={ROLES} onChange={this.changeRole} placeholder="Select an option" />;
            //                         </fieldset>
            //
            //                         <button
            //                             className="btn btn-lg btn-primary pull-xs-right"
            //                             type="submit"
            //                             disabled={this.props.inProgress}>
            //                             Sign up
            //                         </button>
            //
            //                     </fieldset>
            //                 </form>
            //             </div>
            //
            //         </div>
            //     </div>
            // </div>

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.submitForm(firstName, lastName, username, email, password, role)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={this.changeFirstname}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={this.changeLastname}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={this.changeUsername}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={this.changeEmail}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={this.changePassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label" required>Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={role}
                                        onChange={this.changeRole}
                                        label="Role"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            ROLES.map((r) => {
                                                return <MenuItem value={r}>{r}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);