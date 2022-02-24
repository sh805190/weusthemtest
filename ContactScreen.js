
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, TouchableOpacity, Modal, Alert

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { button } from "./Styles";
import Colors from "./Colors";
import { Searchbar } from 'react-native-paper';

const ConfirmationModalPopup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
};


const ContactScreen = ({ navigation }) => {

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirm you want to delete the Contact",
      "The data will be deleted in database!",
      [
        {
          text: "Delete Confirm!",
          onPress: () => deleteContactconfirm(),
        },
        { text: "Cancel", onPress: () => console.log("OK Pressed") }
      ]
    );


  const [visible, setVisible] = useState(false);

  const [contactList, setContactList] = useState([
    {
      title: 'Contact List',
      data: [],
    }

  ]);
  const [contactDetail, setcontactDetail] = useState({ image: '', fname: '', lname: '', email: '', phone: '' })
  const [allCountacts, setAllcontacts] = useState([]);
  function deleteTask(item) {
    let data = contactList[0].data;
    let newdata = data.filter(itemt => itemt !== item)
    const remainingContacts = [
      {
        title: 'Contact List',
        data: newdata,
      }

    ];
    setContactList(...contactList, remainingContacts);

  }
  function editTask(item) {
    for (var i = 0; i < allCountacts.length; i++) {
      if (allCountacts[i].fname + " " + allCountacts[i].lname == item) {
        setcontactDetail({ ...contactDetail, image: allCountacts[i].imageurl, fname: allCountacts[i].fname, lname: allCountacts[i].lname, email: allCountacts[i].email, phone: allCountacts[i].phone })
      }
    }
  }
  function deleteContact(item) {
    for (var i = 0; i < allCountacts.length; i++) {
      if (allCountacts[i].fname + " " + allCountacts[i].lname == item) {
        setcontactDetail({ ...contactDetail, image: allCountacts[i].imageurl, fname: allCountacts[i].fname, lname: allCountacts[i].lname, email: allCountacts[i].email, phone: allCountacts[i].phone })
      }
    }
  }

  function deleteContactconfirm() {


    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
      'fname': contactDetail.fname,
      'lname': contactDetail.lname
    });
    var config = {
      method: 'post',
      url: 'http://192.168.0.11:4000/contact/deletecontact',
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
  useEffect(() => {
    function getContact() {


      var axios = require('axios');

      var config = {
        method: 'post',
        url: 'http://192.168.0.11:4000/contact/getcontact',
        headers: {
          'Authorization': 'Bearer 04347ef6920b5dc33c811a834f0138d33543ded5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      };

      axios(config)
        .then(function (response) {
          setAllcontacts(response.data)
          var nameslot = [];
          for (var item of response.data) {
            nameslot.push(item.fname + " " + item.lname)
          }

          return nameslot;


        }).then(function (nameslot) {

          const newcontactlist = [
            {
              title: 'Contact List',
              data: nameslot,
            }

          ];
          setContactList(newcontactlist);

        })
        .catch(function (error) {
          console.log(error);
        });

    }


    getContact();


  }, [allCountacts]);
  useEffect(() => {
    console.log(contactDetail)
  }, [contactDetail]);



  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.container}>


      <ConfirmationModalPopup visible={visible}>
        <View style={styles.modalHeader}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: Colors.hs_gray_07,
            }}
          >
            Start Editing!
          </Text>
        </View>


        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ContactEditScreen', {
              image: contactDetail.image, fname: contactDetail.fname,
              lname: contactDetail.lname, email: contactDetail.email, phone: contactDetail.phone
            }), setVisible(false);
          }}
        >
          <View style={button.secondaryButton}>
            <Text style={button.secondaryButtonText}>Confirm</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
        >
          <View style={button.secondaryButton}>
            <Text style={button.secondaryButtonText}>Cancel Editing</Text>
          </View>
        </TouchableOpacity>
      </ConfirmationModalPopup>

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <Text>

      </Text>

      <TouchableOpacity onPress={() =>
        navigation.navigate('ContactEditScreen')} >
        <View style={styles.buttonAddnew}>
          <Text style={styles.buttonText}>Add new Contact</Text>
        </View>
      </TouchableOpacity>
      <SectionList
        sections={contactList}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <View style={styles.item}>
          <Text style={styles.title}>{item}
          </Text>
          <TouchableOpacity onPress={() => {
            editTask(item);
            setVisible(true);
            // navigation.navigate('ContactEditScreen', {
            //   image: contactDetail.image, fname: contactDetail.fname,
            //   lname: contactDetail.lname, email: contactDetail.email, phone: contactDetail.phone
            // })
          }}>
            <View style={styles.buttonDelete}>
              <Text style={styles.buttonText}>Edit</Text>
            </View>
          </TouchableOpacity>
          <Text></Text>

          <TouchableOpacity onPress={() => {
            deleteContact(item);
            createTwoButtonAlert();

          }
          }>
            <View style={styles.buttonDelete}>
              <Text style={styles.buttonText}>delete</Text>
            </View>
          </TouchableOpacity>
        </View>}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  buttonAddnew: {
    width: 200,
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "#92a8d1",
    marginBottom: 30,
  },
  buttonDelete: {
    backgroundColor: "#92a8d1",
    alignSelf: 'flex-end',
    width: 100,

  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: Colors.hs_primary,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    elevation: 20,
  },
});
export default ContactScreen;

