
import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    StyleSheet,
    Alert,
} from "react-native";
import { SearchBar } from 'react-native-elements';

import Feather from "react-native-vector-icons/Feather";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

import { button_width } from "./Dimensions";
import { button } from "./Styles";
import Colors from "./Colors";
import { Searchbar } from 'react-native-paper';
import EmailValidator from 'email-validator';



const ContactEditScreen = ({ navigation, route }) => {
    const [text, onChangeText] = useState("");
    const [text1, onChangeText1] = useState("");
    const [text2, onChangeText2] = useState("");
    const [text3, onChangeText3] = useState("");
    const [text4, onChangeText4] = useState("");
    const [flag, setFlag] = useState(0);
    const [fnamestore,setfnamestore]=useState("");
    const [lnamestore,setlnamestore]=useState("");

    useEffect(() => {
        const { fname } = route?.params || {};
        const { lname } = route?.params || {};
        const { image } = route?.params || {};
        const { email } = route?.params || {};
        const { phone } = route?.params || {};
        
        if (fname != undefined || fname != null) {
            setFlag(1);
        }
        onChangeText(fname);
        onChangeText1(lname);
        onChangeText2(image);
        // onChangeText2(image.replace(/["]+/g, ''));

        onChangeText3(email);
        onChangeText4(phone);
        setfnamestore(fname);
        setlnamestore(lname);
        console.log(fname)
        console.log(lname)




    }, []);


    function emailvalidate(text){
        if (EmailValidator.validate(text)!=1){
            alert("Your Email Address Is Not The Correct Format!");
            return;

        }
        else{
            navigation.goBack();

        }
        
        
    }

    async function addnewContact(fname,lname) {
        var axios = require('axios');
        var qs = require('qs');

        console.log(data)
        if (flag == 0) {

            var data = qs.stringify({
                'fname': text,
                'lname': text1,
                'email': text3,
                'phone': text4,
                'image': text2,
                'newfname': text,
                'newlname': text1,
                'newemail': text3,
                'newphone': text4,
                'newimage': text2,
            });

            var config = {
                method: 'post',
                url: 'http://192.168.0.11:4000/contact/addcontact',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        else if (flag == 1) {
            var data = qs.stringify({
                'fname': fname,
                'lname': lname,
                'email': text3,
                'phone': text4,
                'image': text2,
                'newfname': text,
                'newlname': text1,
                'newemail': text3,
                'newphone': text4,
                'newimage': text2,
            });
            console.log(data)
            var config = {
                method: 'post',
                url: 'http://192.168.0.11:4000/contact/updatecontact',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(data);
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        
        <View style={styles.container}>

            <View style={styles.backButton}>
                <TouchableOpacity onPress={async () => {
                    onChangeText("");
                    onChangeText1("");
                    onChangeText2("");
                    onChangeText3("");
                    onChangeText4("");

                    await navigation.goBack()
                }}>
                    <Feather name="x" color={Colors.hs_gray_01} size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Edit Contact INFO</Text>
            </View>
            <View>
                <Text style={styles.inputText}>ImageURL</Text>
                <TextInput style={styles.input}
                    onChangeText={onChangeText2}
                    value={text2} />
            </View>
            <View>
                <Text style={styles.inputText}>First Name</Text>
                <TextInput style={styles.input}
                    onChangeText={onChangeText}
                    value={text} />
            </View>
            <View>
                <Text style={styles.inputText}>Last Name</Text>
                <TextInput style={styles.input}
                    onChangeText={onChangeText1}
                    value={text1} />
            </View>
            <View>
                <Text style={styles.inputText}>Email Address</Text>
                <TextInput style={styles.input}
                    onChangeText={onChangeText3}
                    value={text3} />
            </View>
            <View>
                <Text style={styles.inputText}>Phone Number</Text>
                <TextInput style={styles.input}
                    onChangeText={onChangeText4}
                    value={text4} />
            </View>
            <View
                style={{
                    position: "relative",
                    alignItems: "center",
                    bottom: -20,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={button.secondaryButton}>
                        <Text style={button.secondaryButtonText}>Discard Changes</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    addnewContact(fnamestore,lnamestore);
                    emailvalidate(text3);
                }}>
                    <View style={button.primaryButton}>
                        <Text style={button.primaryButtonText}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>


    );
};

const styles = StyleSheet.create({
    backButton: {
        alignItems: "flex-end",
        padding: 25,
        position: "absolute",
        zIndex: 1,
        width: "100%",
        marginTop: Platform.OS === "ios" ? 40 : 0,
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        marginTop: 20,
        marginBottom: 40,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    input: {
        width: button_width,
        height: 50,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.hs_gray_05,
        marginVertical: 10,
        fontSize: 14,
    },
    inputText: {
        fontWeight: "700",
        color: Colors.hs_gray_03,
    },
});




export default ContactEditScreen;