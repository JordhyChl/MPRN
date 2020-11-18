import React, { Component, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import RNPickerSelect from 'react-native-picker-select';
import { openDatabase } from 'react-native-sqlite-storage';
import DocumentPicker from 'react-native-document-picker';
import PushNotification from 'react-native-push-notification';
import NotificationHandler from './components/NotificationHandler';
import NotifService from './components/NotifService';

var db = openDatabase({ name: 'UserDatabase.db' });

class RegNote extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }
  render() {
    return (
      <NewContact />
    );
  }
}

const RegisterCatatan = ({ navigation }) => {
  const [showWaktu, setShowWaktu] = useState(false);
  const [showInterval, setShowInterval] = useState(false);
  let [catatanJudul, setCatatanJudul] = useState('');
  let [catatanDeskripsi, setCatatanDeskripsi] = useState('');
  let [catatanWaktu, setCatatanWaktu] = useState('');
  let [catatanInterval, setCatatanInterval] = useState('');
  //let [catatanLampiran, setCatatanLampiran] = useState('');
  //let [catatanLampiran, setCatatanLampiran] = [JSON.stringify(catatanLampiran)];

  const [singleFile, setSingleFile] = useState('');
  //const [multipleFile, setMultipleFile] = useState([]);

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  let register_catatan = () => {
    console.log(catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, singleFile.name);
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 30 * 1000), // in 30 secs
  
      /* Android Only Properties */
      channelId: 'default-channel-id',
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: catatanDeskripsi, // (optional) default: "message" prop
      subText: catatanDeskripsi, // (optional) default: none
      color: 'blue', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      //actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
  
      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
  
      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: '', // (optional) default: empty string
  
      /* iOS and Android properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: catatanJudul, // (optional)
      message: catatanDeskripsi, // (required)
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });

    if (!catatanJudul) {
      alert('Please fill Judul Catatan');
      return;
    }
    if (!catatanDeskripsi) {
      alert('Please fill Deskripsi Catatan');
      return;
    }
    // if (!catatanLampiran) {
    //   alert('Please fill Lampiran');
    //   return;
    // }
    //JSON.stringify(catatanLampiran)

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_catatan (catatan_judul, catatan_desc, catatan_waktu, catatan_interval, catatan_lampiran) VALUES (?,?,?,?,?)',
        [catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, singleFile.name],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Judul"
                onChangeText={(catatanJudul) => setCatatanJudul(catatanJudul)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Deskripsi"
                onChangeText={(catatanDeskripsi) => setCatatanDeskripsi(catatanDeskripsi)}
                style={{ padding: 10 }}
              />
              {showWaktu ? (

                <RNPickerSelect
                  placeholder={{
                    label: 'Pilih Waktu Pegingat',
                    color: '#9EA0A4',
                  }}
                  onValueChange={(catatanWaktu) => setCatatanWaktu(catatanWaktu)}
                  items={[
                    { label: '1 Hari', value: '1 Hari' },
                    { label: '3 Jam', value: '3 Jam' },
                    { label: '1 Jam', value: '1 Jam' },
                  ]}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 10,
                      right: 12,
                    },
                  }}
                />
              ) : null}
              <Mybutton
                title="Isi Waktu Pengingat"
                customClick={() => setShowWaktu(!showWaktu)}
              />
              {showInterval ? (
                <RNPickerSelect
                  placeholder={{
                    label: 'Pilih Interval Waktu',
                    color: '#9EA0A4',
                  }}
                  onValueChange={(catatanInterval) => setCatatanInterval(catatanInterval)}
                  items={[
                    { label: '1 Hari', value: '1 Hari' },
                    { label: '3 Jam', value: '3 Jam' },
                    { label: '1 Jam', value: '1 Jam' },
                  ]}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 10,
                      right: 12,
                    },
                  }}
                />
              ) : null}
              <Mybutton
                title="Isi Interval Waktu"
                customClick={() => setShowInterval(!showInterval)}
              />
              <Mytextinput
                placeholder="Enter Lampiran"
                value={singleFile.name}
                //onChangeText={(singleFile) => setSingleFile(singleFile)}
                style={{ padding: 10 }}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={selectOneFile}>
                {/*Single file selection button*/}
                <Text style={{ marginRight: 10, fontSize: 19, paddingTop: 10 }}>
                  Click here to pick file
              </Text>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                  }}
                  style={styles.imageIconStyle}
                />
              </TouchableOpacity>
              {/*Showing the data of selected Single file*/}
              {/* <Text style={styles.textStyle} >
                File Name: {singleFile.name ? singleFile.name : ''}
                {'\n'}
                Type: {singleFile.type ? singleFile.type : ''}
                {'\n'}
                File Size: {singleFile.size ? singleFile.size : ''}
                {'\n'}
                URI: {singleFile.uri ? singleFile.uri : ''}
                {'\n'}
              </Text> */}
              <Image
                source={{ uri: singleFile.uri }}
                style={{ width: 424, height: 278 }}
              />
              <Mybutton title="Submit" customClick={register_catatan} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCatatan;

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    marginLeft: 35,
    marginTop: 10,
    marginRight: 35,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});
