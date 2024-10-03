import React, { useState, useEffect } from 'react';
import {
	Box,
	Alert
} from 'native-base';
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	I18nManager,
	Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');
import MyIcon from 'react-native-vector-icons/FontAwesome';
import {
	CardGradientComponent,
	HeaderComponent,
	EmptyComponent,
	Loader
} from '../../components/component';
import { useDetailsAll } from '../../context/detailsProvider';
import SQLite from 'react-native-sqlite-2';
import NetInfo from "@react-native-community/netinfo";
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1);
import { getMethodCall, PostDataCall, getCallParams } from '../../api/apiService';
export default function SubjectContent(props) {
	const {subjectContent,contentType,chapterList,getChaptersByClass,getChatersByTermORSem} = useDetailsAll();
	//const [chapterList,setChapterList] = useState([]);
	const [isDownload, setIsDownload] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [internetError, setInternetError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedContentId, setSelectedContentId] = useState(null);
	const [selectedContentName, setSelectedContentName] = useState(null);
    const colorsObjectJson= { 
        "1": "#0095d9",
        "2": "#0095d9",
        "3": "#0095d9",
        "4": "#0095d9",
        "5": "#0095d9",
    }
	useEffect(() => {

		const unsubscribe = NetInfo.addEventListener(state => {
		  console.log("Connection type", state.type);
		  console.log("Is connected?", state.isConnected);
		  if(!state.isConnected){
			setIsConnected(false);
		  }
		  else{
			setIsConnected(true);
		  }
		});
		return () => {
			unsubscribe();
		  };
	  
		}, [NetInfo]);

const getChapters = (id,title) => {
	//Alert(props.route.params.id);
	//alert(id,title)
    getChatersByTermORSemLocally(props.route.params.id, id,title);
	setSelectedContentId(id);
	setSelectedContentName(title);
    // props.navigation.navigate('ContentChapters', {
    //     id:id,
    //     name: title,
    //   });
}
const getChatersByTermORSemLocally = async (classid,subjectid,title) => {
	setLoading(true);
	// db.transaction(function (txn) {
	// 	if(contentType.type=='term'){
	// 		//alert('No Chapters Found');
			
	// 	txn.executeSql('SELECT * FROM `Chapters` WHERE subjectid = '+subjectid+' AND classid = '+classid+' AND term = "'+contentType.value+'"', [], function (tx, res) {
	// 		let data = [];
	// 		for (let i = 0; i < res.rows.length; ++i) {
	// 			data.push(res.rows.item(i));
	// 			console.log('subjectid:', res.rows.item(i))
	// 		}
	// 		if (data.length > 0) {
	// 			//alert(data.length+' Chapters Found')
	// 			setIsDownload(true);
	// 			setShowDownload(false);
	// 			setLoading(false);
	// 			//setChapterList(data);
	// 		}else{
				
	// 			setIsDownload(false);
	// 			setShowDownload(true);
	// 			setLoading(false);
	// 		}
			
	// 		//setChapterList(data);
	// 		//setLocalChapterList(data);
	// 	})
		
	// } else {
	// 	txn.executeSql('SELECT * FROM `Chapters` WHERE subjectid = '+subjectid+' AND classid = '+classid+' AND semester = "'+contentType.value+'"', [], function (tx, res) {
	// 		let data = [];
	// 		for (let i = 0; i < res.rows.length; ++i) {
	// 			data.push(res.rows.item(i));
	// 			console.log('subjectid:', res.rows.item(i))
	// 		}
	// 		if (data.length > 0) {
	// 			setIsDownload(true);
	// 			setShowDownload(false);
	// 			setLoading(false);
	// 			//setChapterList(data);
	// 		}else{
	// 			setIsDownload(false);
	// 			setShowDownload(true);
	// 			setLoading(false);
	// 		}
	// 	})
	// }
	// })
	
	//setLoading(false);

	let resource = 'contentchapterlist?';
	let filter='classid='+classid+'&subjectid='+subjectid+'&type='+contentType.type+'&typevalue='+contentType.value
	getCallParams(resource, filter, ChaptersCallback, errorCallback,title);
}
const ChaptersCallback = async(data,title) => {
	console.log('chapterList',data)
	setLoading(false);
	props.navigation.navigate('ContentChapters', {
		id:selectedContentId,
		name: title,
		data:data
	  });

}
const errorCallback = async(data)=>{
	console.log('errorList',data)
}
useEffect(() => {
if (isConnected && showDownload) {
	console.log('chapterList',showDownload)	
	setInternetError(null);
	getChaptersByClass(props.route.params.id);
	//setLoading(false);

} else {
	//setInternetError('No Internet Connection');
	//alert('No Internet Connection');
}
}, [showDownload]);

// useEffect(() => {
// if (chapterList && chapterList.length > 0) {
// 	setIsDownload(true);
// 	console.log('chapterList',chapterList)

// }
// }, [chapterList]);
useEffect(() => {
	if(showDownload && chapterList.length>0){
	  createChapterTable();
	// alert('hh');
	
	}
  }, [showDownload,chapterList]);

const createChapterTable = (data) => {
	//alert('hh')
	setShowDownload(false);
	db.transaction(function (txn) {
	// txn.executeSql('DROP TABLE IF EXISTS Chapters', [])
		txn.executeSql(
		  'CREATE TABLE IF NOT EXISTS Chapters (id INTEGER PRIMARY KEY NOT NULL,classid INTEGER NOT NULL,chapterid INTEGER,video TEXT,chapter VARCHAR(70),subjectid INTEGER NOT NULL,term VARCHAR(30),semester VARCHAR(30),active INTEGER,localvideo TEXT)',
		  []
		)
  //demo entry
 // txn.executeSql('INSERT INTO Chapters (id,classid,chapterid,video,name,subjectid,term,semester,isactive) VALUES (:id,:classid,:chapterid,:video,:name,:subjectid,:term,:semester,:isactive)', [1,1,1,'https://www.youtube.com/watch?v=1j4gR9pd2VU','Chapter 1','1','1','1','1'])
  chapterList.map((item,index)=>{
	// skip if exists
     txn.executeSql('SELECT * FROM `Chapters` WHERE id = '+item.id, [], function (tx, res) {
		if(res.rows.length==0){
			txn.executeSql('INSERT INTO Chapters (id,classid,chapterid,video,chapter,subjectid,term,semester,active,localvideo) VALUES (:id,:classid,:chapterid,:video,:chapter,:subjectid,:term,:semester,:active,:localvideo)', [item.id,item.classid,item.id,item.video,item.chapter,item.subjectid,item.term,item.semester,item.active,null]);
		}
	})

	console.log('item',item)
	//txn.executeSql('INSERT INTO Chapters (id,classid,chapterid,video,chapter,subjectid,term,semester,active,localvideo) VALUES (:id,:classid,:chapterid,:video,:chapter,:subjectid,:term,:semester,:active,:localvideo)', [item.id,item.classid,item.id,item.video,item.chapter,item.subjectid,item.term,item.semester,item.active,null])
  })
  setTimeout(() => {
	setShowDownload(false);
	setIsDownload(true);
	getChatersByTermORSem(props.route.params.id, selectedContentId);
	//checkChapterTable(id);
	setLoading(false);
  }, 4000);

		//txn.executeSql('INSERT INTO Chapters (name,classid,subject,chapterid) VALUES (:name,:classid,:subject,:chapterid)', [data.chapter,1,data.subject,data.id])
		//txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Thangaraj'])
		
	})
}
useEffect(() => {
	if (isDownload) {
		getChatersByTermORSem(props.route.params.id, selectedContentId);
		console.log('chapterList',isDownload)
		setShowDownload(false);
		setIsDownload(false);
		props.navigation.navigate('ContentChapters', {
			     id:selectedContentId,
			     name: selectedContentName,
			   });
	}
}, [isDownload]);

	return (
		<Box flex="1">
			<HeaderComponent
				wrapperColor="#151218"
				bgColor="#fece2e"
				headerTitle={'CONTENTS'}
				nav={props.navigation}
				LeftContent={'goback'}
			/>
			   {loading ? <Loader /> : false}
			<View style={{ margin: 10, flex: 1 }}>
			      
				<FlatList
					data={subjectContent}
					showsVerticalScrollIndicator={false}
					style={{ marginTop: 5,}}
					ListEmptyComponent={() => (
						<EmptyComponent data={'No Subjects Found'} />
					)}
					renderItem={({ item, index }) =>
                    subjectContent.length > 0 ? (
							<TouchableOpacity onPress={()=>getChapters(item.id,item.subject_name)}  style={{ marginTop: 5 }}>
								<Box
									style={[
										{
											backgroundColor:colorsObjectJson[index+1],
											// width: '70%',
											borderRadius: 10,
											// borderBottomRightRadius: 20,
											padding: 20,
											flexDirection: 'row'
										},
									]}>
									<View style={{ flex: 3 }}>
									<View style={{flexDirection:'row'}}>
									<Text fontSize="md" style={{ color: '#fff',flex:0.4,width:5}}>
											<Text
												style={{
													fontSize: 16,
													color: '#fff',
													fontWeight: 'bold',
												}}>
												{index + 1}.
											</Text>
										</Text>
										<Text fontSize="md" style={{ color: '#fff',flex:3,justifyContent:'flex-start'}}>
											<Text
												style={{
													fontSize: 16,
													color: '#fff',
													fontWeight: 'bold',
												}}>
											 {item.subject_name}
											</Text>
										</Text>
										</View>
										{/* <Text style={{color: '#fff', paddingTop: 10}}>
                      <Text style={{fontSize: 16}}>{item.class_name}</Text>
                    </Text> */}
									</View>
									<View style={{ flex: 1, alignItems: 'flex-end' }}>
											<MyIcon name='chevron-right' style={{ color: '#fff' }} size={25} />
										</View>
								</Box>
							</TouchableOpacity>
						) : (
							false
						)
					}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>

		

		
		</Box>
	);
}
