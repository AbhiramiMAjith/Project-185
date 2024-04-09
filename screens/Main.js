import {React,Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import Camera from 'expo-camera'
import FaceDetector from 'expo-face-detector'
import StatusBar from 'expo-status-bar'
import * as Permissions from 'expo-permissions'

import Filter1 from '../components/Filter1'
import Filter2 from '../components/Filter2'
import Filter3 from '../components/Filter1'
import Filter4 from '../components/Filter1'

import {RFValue, RFPercentage} from 'react-native-responsive-fontsize'

const filters = {
    "crown-pic-1":{
        src : require("../assets/crown-pic1.png")
    },
    "crown-pic-2":{
        src : require("../assets/crown-pic2.png")
    },
    "crown-pic-3":{
        src : require("../assets/crown-pic3.png")
    },
    "crown-pic-3":{
        src : require("../assets/crown-pic3.png")
    },
    "flower-pic-1":{
        src : require("../assets/flower-pic1.png")
    },
    "flower-pic-2":{
        src : require("../assets/flower-pic2.png")
    },
    "flower-pic-3":{
        src : require("../assets/flower-pic3.png")
    },
    "hair-pic-1":{
        src : require("../assets/hair-pic1.png")
    },
    "hat-pic-1":{
        src : require("../assets/hat-pic1.png")
    },
    "hat-pic-2":{
        src : require("../assets/hat-pic2.png")
    },
    "other-pic-1":{
        src : require("../assets/other-pic1.png")
    },
    "other-pic-2":{
        src : require("../assets/other-pic2.png")
    },
    "other-pic-3":{
        src : require("../assets/other-pic3.png")
    }

}
/*width : 3.5,
        height : 0.7,
        left : 0.46,
        right : 0.15,
        top : 1.5*/
let data={
    crown :[
        {id : "crown-pic-1"},
        {id : "crown-pic-2"},
        {id : "crown-pic-3"}
    ],
    flower : [
        {id : "flower-pic-1"},
        {id : "flower-pic-2"},
        {id : "flower-pic-3"}
    ],
    hat : [
        {id : "hat-pic-1"},
        {id : "hat-pic-2"},
    ],
    other : [
        {id : "other-pic-1"},
        {id : "other-pic-2"},
        {id : "other-pic-3"}
    ],
    hair : [
        {id : "hair-pic-1"},
    ]
}

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hasCameraPermission : null,
            faces : [],
            currentFilter : "filter_1",
            selected : 'crown'
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFaceDetection = this.onFaceDetection.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
    }

    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)
    }

    onCameraPermission=(status)=>{
        this.setState({hasCameraPermission : status.status === 'granted'})
    }

    onFaceDetection=(faces)=>{
        this.setState({faces : faces})
    }
    onFaceDetectionError =(error)=>{
        console.log(error)
    }

    render(){
        const {hasCameraPermission} = this.state
        if (hasCameraPermission === null){
            return <View/>
        }
        if (hasCameraPermission === false){
            return (
                <View style = {styles.container}>
                    <text>No access to camera</text>
                </View>
            )
        }
        console.log(this.state.faces)
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>
                        LOOK ME
                    </Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera 
                        style={{flex : 1}}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode : FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks : FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications : FaceDetector.FaceDetectorClassifications.all
                        }}
                        onFacesDetected = {this.onFaceDetection}
                        onFacesDetectionError = {this.onFaceDetectionError}
                    />
                    {this.state.faces.map((face)=>{
                        if (this.state.currentFilter === 'filter_1'){
                            return <Filter1 key={face.faceId} face={face}/>
                        }
                        if (this.state.currentFilter === 'filter_2'){
                            return <Filter2 key={face.faceId} face={face}/>
                        }
                        if (this.state.currentFilter === 'filter_3'){
                            return <Filter3 key={face.faceId} face={face}/>
                        }
                        if (this.state.currentFilter === 'filter_4'){
                            return <Filter4 key={face.faceId} face={face}/>
                        }
                    })}
                    <View>
                        <TouchableOpacity></TouchableOpacity>
                    </View>
                    <View style={styles.filterContainer}>
                        <ScrollView
                            style={{flexDirection : 'row'}} 
                            horizontal 
                            showsHorizontalScrollIndicator={false}>
                                {data.map((filterData)=>{
                                    return(
                                        <TouchableOpacity style={styles.filterImageContainer}
                                        onPress={this.setState({currentFilter : `filter_${filterData.id}`})}>
                                            <Image source={filterData.image} style={{height : 32, width:80}}/>
                                        </TouchableOpacity>
                                    )
                                })}
                        </ScrollView>
                    </View>
                    <View style={styles.categoryContainer}>
                        <ScrollView
                        contentContainerStyle={{flexDirection : 'row', flex : 0.6}}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                            {Object.keys(data).map((category)=>{
                                return(
                                    <TouchableOpacity
                                    key={`category_button_${category}`}
                                    style={[styles.filterImageContainer]}
                                    onPress={()=>{
                                        this.setState({
                                            selected : category,
                                            currentFilter : data[category][0].id
                                        })
                                    }}>
                                        <Text>{category}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1
    },
    droidSafeArea :{
        marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    headingContainer : {
        flex :0.1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    titleText : {
        fontSize : 30
    },
    cameraStyle : {
        flex : 0.65
    },
    filterContainer : {
        flex : 0.2,
        paddingLeft : RFValue(20),
        paddingRight : RFValue(20),
        paddingTop : RFValue(30)
    },
    filterImageContainer :{
        height : RFPercentage(8),
        width : RFPercentage(15),
        justifyContent : 'center',
        alignItems : 'center',
        
    },
    categoryContainer : {
        flex : 0.2,
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        marginBottom : RFValue(10)
    },
    categoryBox : {
        flex: 0.2,
		borderRadius: 30,
		borderWidth: 1,
		backgroundColor: 'white',
		width: '100%',
		padding: RFValue(3),
		margin: 1,
		alignItems: 'center',
    },
    categoryBoxSelcted : {
        flex: 0.2,
		borderRadius: 30,
		borderWidth: 1,
		backgroundColor: '#efb141',
		width: '100%',
		padding: RFValue(3),
		margin: 1,
		alignItems: 'center',
    }
})