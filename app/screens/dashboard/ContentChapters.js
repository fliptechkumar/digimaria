import React, { useState, useEffect } from 'react';
import {
	VStack,
	Box,
	Divider,
	NativeBaseProvider,
	Image,
	StatusBar,
	HStack,
	ScrollView,
	IconButton,
	Icon,
	Input,
	FormControl,
	WarningOutlineIcon,
	Center,
	Button,
	useToast,
	Actionsheet,
	CloseIcon,
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
} from '../../components/component';
import Logo from '../../assets/sub1.jpg';
import { useDetailsAll } from '../../context/detailsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imageBaseUrl } from '../../../config.json';
import SQLite from 'react-native-sqlite-2';
import RNFetchBlob from "rn-fetch-blob";
import NetInfo from "@react-native-community/netinfo";
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1);
import { getMethodCall, PostDataCall, Uploadfiles } from '../../api/apiService';
export default function Home(props) {
	const toast = useToast();
	const [showContent, setShowContent] = useState(false);
	const [showActivities, SetshowActivities] = useState(false);
	const [title, SetTitle] = useState(null);
	const [selectedChapter, SetSelectedChapter] = useState(null);
	const [showNotification, SetShowNotification] = useState(false);
	const [showDownload, setShowDownload] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const [isDownload, setIsDownload] = useState(false);
	const [ contents, setContents ] = useState([]);
	const [showTaskDownload, setShowTaskDownload] = useState(false);
	const [TaskDownloaded, setTaskDownloaded] = useState(false);
	const { getChapters, chapterList, loading, contentsList,setLocalChapterList ,contentType,getChaptersByClass} = useDetailsAll();
	const DestinationRoot = RNFetchBlob.fs.dirs.DownloadDir + '/' + 'MyApp/images';
	//const { getChapters, chapterList, loading, contentsList,contentType } = useDetailsAll();

	useEffect(() => {
		//console.log(props?.route?.params?.data);
		// 	 db.transaction(function (txn) {
		//   txn.executeSql('DROP TABLE IF EXISTS Tasks', [])
		// })
	
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
	
	const createTable = (data) => {
		//alert('hh')

		db.transaction(function (txn) {
			// txn.executeSql('DROP TABLE IF EXISTS Users', [])
			// txn.executeSql(
			//   'CREATE TABLE IF NOT EXISTS Chapters(id INTEGER PRIMARY KEY NOT NULL,classid VARCHAR(30),chapterid VARCHAR(30),subject VARCHAR(30),name VARCHAR(30))',
			//   []
			// )
			//txn.executeSql('INSERT INTO Chapters (name,classid,subject,chapterid) VALUES (:name,:classid,:subject,:chapterid)', [data.chapter,1,data.subject,data.id])
			//txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Thangaraj'])
			txn.executeSql('SELECT * FROM `Chapters`', [], function (tx, res) {
				for (let i = 0; i < res.rows.length; ++i) {
					console.log('Chapters:', res.rows.item(i))
				}
			})
		})
	}
	const getChaptersLocally = async (subjectid) => {
		//alert(subjectid)
			db.transaction(function (txn) {
				txn.executeSql('SELECT * FROM `Chapters` WHERE subjectid = '+subjectid, [], function (tx, res) {
					let data = [];
					for (let i = 0; i < res.rows.length; ++i) {
						data.push(res.rows.item(i));
						console.log('subjectid:', res.rows.item(i))
					}
					setLocalChapterList(data);
				})
			})
		}

	useEffect(() => {
		//loadResourcesAndDataAsync();
		//getChapters(props.route.params.id);
	}, []);
	
	const onCancel = () => {
		SetshowActivities(false);
		setShowContent(false);
	}
	const showActivity = (type, data) => {
		if (type == 'flipbook') {
			SetshowActivities(false);
			props.navigation.navigate('EBookAssets', { assets: data.asset, title: data.title })
		} else if (type == 'audio') {
			props.navigation.navigate('VideoAsset', { assets: data.asset, title: data.title })
		} else {
			props.navigation.navigate('SelectActivity', { assets: data.asset, title: data.title })
		}

	}
	const OpenContent = (data) => {
		// alert(JSON.stringify(data))
		SetSelectedChapter(data);
		setShowContent(true);
		SetTitle(data.chapter);
		checkTaskLocally(data.id);
		//props.navigation.navigate('Content',{title:data.chapter})
	}

	const downloadLocal = (data) => {
		// alert(JSON.stringify(data))
		createTable(data);
	}


	const getContents = async (chapterid) => {
		//setLoading(true);
		let resource = 'chapteractivities?';
		let filter='chapterid='+chapterid
		getMethodCall(resource, filter, ContentsCallback, errorCallback);
	  }
	  const errorCallback = (data) => {
		//setLoading(false);
		console.log('errorCallback',data);
	  
	  };
	  const ContentsCallback = async(data) => {
		if (data.errorCode==0){
		  //console.log('contentsdata',data.)
		 // setContents(data.result);
		  checkTypeSaveLocally(data.result);
		} else {
		  setContents([])
		}
		//setLoading(false);
	  };

	  const checkTypeSaveLocally =  (data) => {
        //let result = [];
         data.map((item,index)=>{
			if(item.type == 'matchtherows'){
				item.questions=	ImageExist(item.questions,'matchtherows')
			}
			if(item.type == 'matchtherowsColour'){
				item.questions=	ImageExist(item.questions,'matchtherowsColour')
			}
			if (item.type == 'draganddrop') {
				item.questions = ImageExistDragandDrop(item.questions)
			}
			if(item.type == 'circletheanswer'){
                 item.questions= ImageExistCircle(item.questions)
			}
			if(item.type == 'ticktheanswer'){
				item.questions=	ImageExistTick(item.questions)
			}	
			if(item.type == 'multipledraganddrop'){
				item.questions=	ImageExistMulti(item.questions)
			}
			//result.push(item);
		 })
		// console.log(JSON.stringify(data));
		 setContents(data);

	  }
	  function isValidUrl(string) {
		var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null)
	  }
	  const ImageExist =  (data,type) => {
		data.map((item,index)=>{
			for(let i=0;i<item.questionsRow.length;i++){
				//console.log('Data',item.questionsRow[i]);
				var pathUrl = item.questionsRow[i].trim();;
				var fileName = Date.now();
				var fileExtention = pathUrl.split('.').pop();
				var fileFullName = fileName + '.' + fileExtention;
				if(item.questionsRow[i] && isValidUrl(item.questionsRow[i])){
				   item.questionsRow[i] = DestinationRoot + '/' + fileFullName;
				   DownLoadLocaly(pathUrl,fileName);

				}
			}
			for(let j=0;j<item.answerRow.length;j++){
				var pathUrl = item.answerRow[j].trim();;
				var fileName = Date.now();
				var fileExtention = pathUrl.split('.').pop();
				var fileFullName = fileName + '.' + fileExtention;
				if(item.answerRow[j] && isValidUrl(item.answerRow[j])){
				   item.answerRow[j] = DestinationRoot + '/' + fileFullName;
				   DownLoadLocaly(pathUrl,fileName);
				}
			}
			if(type=='matchtherowsColour'){
				//colorRow
				for(let k=0;k<item.colorRow.length;k++){
					var pathUrl = item.colorRow[k];
					var fileName = Date.now();
					var fileExtention = pathUrl.split('.').pop();
					var fileFullName = fileName + '.' + fileExtention;
					if(item.colorRow[k] && isValidUrl(item.colorRow[k])){
					   item.colorRow[k] = DestinationRoot + '/' + fileFullName;
					   DownLoadLocaly(pathUrl,fileName);
					}
				}
			}

		})
		//console.log('itemquest',data)
		return data;
	  }
	  const ImageExistMulti =  (data) => {
		data.map((item,index)=>{
			for(let i=0;i<item.question.length;i++){
				var pathUrl = item.question[i].trim();;
				var fileName = Date.now();
				var fileExtention = pathUrl.split('.').pop();
				var fileFullName = fileName + '.' + fileExtention;
				if(item.question[i] && isValidUrl(item.question[i])){
					item.question[i] = DestinationRoot + '/' + fileFullName;
					DownLoadLocaly(pathUrl,fileName);
				}
			}
		})
		//console.log('itemquest',data)
		return data;
	  }

	  const ImageExistDragandDrop =  (data) => {
			data.map((item,index)=>{
				if(item.image && isValidUrl(item.image)){
					var pathUrl = item.image.trim();;
				    var fileName = Date.now();
				    var fileExtention = pathUrl.split('.').pop();
				    var fileFullName = fileName + '.' + fileExtention;
					item.image = DestinationRoot + '/' + fileFullName;
					DownLoadLocaly(pathUrl,fileName);
				}
				if(item.answerimage && isValidUrl(item.answerimage)){
					var pathUrl = item.answerimage.trim();;
				    var fileName = Date.now();
				    var fileExtention = pathUrl.split('.').pop();
				    var fileFullName = fileName + '.' + fileExtention;
					item.answerimage = DestinationRoot + '/' + fileFullName;
					DownLoadLocaly(pathUrl,fileName);
					
				}
			})
		  return data;
		}
		const ImageExistCircle =  (data) => {
			data.map((item,index)=>{
				if(item.question && isValidUrl(item.question)){
					var pathUrl = item.question.trim();;
				    var fileName = Date.now();
				    var fileExtention = pathUrl.split('.').pop();
				    var fileFullName = fileName + '.' + fileExtention;
					item.question = DestinationRoot + '/' + fileFullName;
					DownLoadLocaly(pathUrl,fileName);
				}
				if(item.image && isValidUrl(item.image)){
					var pathUrl = item.image.trim();;
				    var fileName = Date.now();
				    var fileExtention = pathUrl.split('.').pop();
				    var fileFullName = fileName + '.' + fileExtention;
					item.image = DestinationRoot + '/' + fileFullName;
					DownLoadLocaly(pathUrl,fileName);
				}
				

			})
		  return data;
		}
		const ImageExistTick =  (data) => {
			data.map((item,index)=>{
				if(item.question && isValidUrl(item.question)){
					var pathUrl = item.question.trim();;
				    var fileName = Date.now();
				    var fileExtention = pathUrl.split('.').pop();
				    var fileFullName = fileName + '.' + fileExtention;
					item.question = DestinationRoot + '/' + fileFullName;
					DownLoadLocaly(pathUrl,fileName);
				}
				for(let i=0;i<item.options.length;i++){
					if(item.options[i] && isValidUrl(item.options[i])){
						var pathUrl = item.options[i].trim();
						var fileName = Date.now();
						var fileExtention = pathUrl.split('.').pop();
						var fileFullName = fileName + '.' + fileExtention;
						item.options[i] = DestinationRoot + '/' + fileFullName;
						DownLoadLocaly(pathUrl,fileName);
					}
				}
			})
			return data;
		}


	  const DownLoadLocaly =  (url,fileName) => {
		let localPath = '';
		let pathUrl = url;
		const fileExtention = pathUrl.split('.').pop();
		console.log('fileExtention',url);
		//return fileExtention;
		const fileFullName = fileName + '.' + fileExtention;
		RNFetchBlob.config({
			fileCache: true,
			path: DestinationRoot + '/' + fileFullName,
		})
		.fetch("GET", pathUrl, {})
		.then((res) => {
			console.log(url, res.path());
				//localPath = res.path();
				return res.path();

			});
		}

	  useEffect(() => {
		if(showTaskDownload && contents.length > 0){
			createTaskTable(selectedChapter.id);
		}
		
	  },[showTaskDownload,contents]
	  );
	  const createTaskTable =  (id) => {
		db.transaction(function (txn) {
			txn.executeSql('CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, chapterid INTEGER, asset TEXT)', [], function (tx, res) {
				console.log('res', res)
				//getTasks(id);
			})
			txn.executeSql('INSERT INTO Tasks (id,chapterid,asset) VALUES (:id,:chapterid,:asset)', [id,id,JSON.stringify(contents)], function (tx, res) {
				console.log('res', res)
				//getTasks(id);
				checkTaskLocally(id);
			}
			)
		})
	
	}
	const checkTaskLocally = async (id) => {
		//alert(id)
		db.transaction(function (txn) {
			txn.executeSql('SELECT * FROM `Tasks` WHERE chapterid = '+id, [], function (tx, res) {
				let data = [];
				for (let i = 0; i < res.rows.length; ++i) {
					data.push(res.rows.item(i));
					console.log('subjectidsData:', res.rows.item(i))
				}
				if(data.length > 0){
					//setIsDownload(true);
					setTaskDownloaded(true);
					setShowTaskDownload(false);
					//props.navigation.navigate('SelectActivity', { assets: data, title: title })
				}else{
					//setIsDownload(false);
					setTaskDownloaded(false);
					setShowTaskDownload(false);
				}
			})
		})
	
	}
	const DownLoadVideo =  (url, id) => {
		setShowDownload(true);
		let pathUrl = url;
		const destinationPath = RNFetchBlob.fs.dirs.DownloadDir + '/' + 'MyApp/videos';
		const fileName = Date.now()
		const fileExtention = pathUrl.split('.').pop();
		const fileFullName = fileName + '.' + fileExtention;
		RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      path: destinationPath + '/' + fileFullName,
    })
      .fetch("GET", pathUrl, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log("The file saved to ", res.path());
		selectedChapter.localvideo = res.path();
		db.transaction(function (txn) {
			txn.executeSql('UPDATE Chapters SET localvideo = "' + res.path() + '" WHERE id = ' + id, [], function (tx, res) {
				console.log('res', res)
				setShowDownload(false);
				//setShowContent(false);
				getChaptersLocally(props.route.params.id);
				
			
			})
		})
      });
	}

	const ToastAlert = ({
		id,
		status,
		variant,
		title,
		description,
		isClosable,
		...rest
	}) => <Alert maxWidth="90%" alignSelf="center" flexDirection="row" status={status ? status : "warning"} variant={variant} {...rest}>
			<VStack space={1} flexShrink={1} w="100%">
				<HStack flexShrink={1} alignItems="center" justifyContent="space-between">
					<HStack space={2} flexShrink={1} alignItems="center">
						<Alert.Icon />
						<Text style={{ fontSize: 18, fontWeight: 'bold' }} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
							{title}
						</Text>
					</HStack>
					{isClosable ? <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{
						color: variant === "solid" ? "lightText" : "darkText"
					}} onPress={() => toast.close(id)} /> : null}
				</HStack>
				<Text px="6" style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22 }} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
					{description}
				</Text>
			</VStack>
		</Alert>;

	const notificationAlert = () => {
		var item = {
			title: "Stay tuned",
			variant: "top-accent",
			description: "Coming soon"
		};
		var id = 0;
		toast.show({
			placement: "top",
			render: ({
				id
			}) => {
				return <ToastAlert id={id} {...item} />;
			}
		})
	};


	return (
		<Box flex="1">
			<HeaderComponent
				wrapperColor="#151218"
				bgColor="#fece2e"
				headerTitle={contentType.type=='term'?'TERM '+contentType.value:'SEMESTER '+contentType.value}
				nav={props.navigation}
				LeftContent={'goback'}
			/>
			<View style={{ margin: 10, flex: 1 }}>
            {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#04503e'}}>{contentType.type=='term'?'TERM '+contentType.value:'SEMESTER '+contentType.value}</Text> */}
			      <View style={{marginTop: 10 }}>
                   <Box  style={[
										{
											backgroundColor: '#04503e',
											 width: '80%',
											borderTopRightRadius: 30,
											borderBottomRightRadius: 30,
											borderTopLeftRadius:5,
											borderBottomLeftRadius:5,
											height: 50,
											padding: 15,
											flexDirection: 'row'
										},
									]}>
						<View style={{flexDirection:'row',flex:1}}>
							<Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff',flex:3}}>{props.route.params.name}</Text>
							<View  style={{flex:0.5 }}>
							      <MyIcon name='chevron-down' style={{ color: '#fff' }} size={22} />
							</View>
						</View>
				</Box>
                </View>
				<FlatList
					data={props?.route?.params?.data?.result}
					showsVerticalScrollIndicator={false}
					style={{ marginTop: 5,marginLeft:15}}
					ListEmptyComponent={() => (
						<EmptyComponent data={'No chapters found'} />
					)}
					renderItem={({ item, index }) =>
					props?.route?.params?.data?.result.length > 0 ? (
							<TouchableOpacity onPress={() => { item.active == 1  ? OpenContent(item) : notificationAlert() }} style={{ marginTop: 5 }}>
								<Box
									style={[
										{
											backgroundColor: item.active == 1 ?'#04503e': '#3b8476',
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
											 {item.chapter}
											</Text>
										</Text>
										</View>
										{/* <Text style={{color: '#fff', paddingTop: 10}}>
                      <Text style={{fontSize: 16}}>{item.class_name}</Text>
                    </Text> */}
									</View>
									{item.active == 1  ?
										<View style={{ flex: 1, alignItems: 'flex-end' }}>
											<MyIcon name='chevron-right' style={{ color: '#fff' }} size={25} />
										</View>
										:
										<View onPress={() => downloadLocal(item)} style={{ flex: 0.5, alignItems: 'flex-end' }}>
											<MyIcon name='lock' style={{ color: 'gold' }} size={25} />
										</View>
									}
								</Box>
							</TouchableOpacity>
						) : (
							false
						)
					}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>

			<Actionsheet isOpen={showActivities} onClose={onCancel}>
				<Actionsheet.Content style={{ backgroundColor: '#FFFFFF' }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', alignSelf: 'flex-start', paddingLeft: 10, fontStyle: 'italic' }}>CONTENTS</Text>
					<FlatList
						data={contentsList}
						showsVerticalScrollIndicator={false}
						style={{ width: '100%', marginTop: 10 }}
						renderItem={({ item, index }) =>
							contentsList.length > 0 ? (
								<TouchableOpacity onPress={() => showActivity(item.type, item)} style={{ marginTop: 5, width: '100%' }}>
									<Box
										style={[
											{
												backgroundColor: '#31305E',
												borderRadius: 10,
												// borderBottomRightRadius: 20,
												padding: 15,
											},
										]}>
										<View style={{flexDirection:'row'}}>
										<Text fontSize="md" style={{ color: '#fff',flex:1 }}>
												<Text
													style={{
														fontSize: 16,
														color: '#fff',
														fontWeight: 'bold',
													}}>
													{index + 1}. {item.title}
												</Text>
											</Text>
										</View>
									</Box>
								</TouchableOpacity>
							) : (
								false
							)
						}
						keyExtractor={(item, index) => index.toString()}
					/>
				</Actionsheet.Content>
			</Actionsheet>


			<Actionsheet isOpen={showContent} onClose={onCancel}>
				<Actionsheet.Content style={{ backgroundColor: '#f1e8c7' }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', alignSelf: 'flex-start', paddingLeft: 10 }}>CONTENTS</Text>
					<View style={{ width: '100%', marginTop: 10 }} >
						{selectedChapter && selectedChapter.video ? (
						<TouchableOpacity onPress={() => {
							if (selectedChapter && selectedChapter.video) {
								setShowContent(false);
								props.navigation.navigate('VideoAsset', { assets: selectedChapter.video, title: title })
							} else {
								if(isConnected){
								   // DownLoadVideo(selectedChapter.video, selectedChapter.id);
								   props.navigation.navigate('VideoAsset', { assets: selectedChapter.video, title: title })
								}else{
									alert('Please check your internet connection')
							    }
							}
						
						}}
							style={[
								{
									backgroundColor: '#f58345',
									borderRadius: 10,
									// borderBottomRightRadius: 20,
									padding: 15,
								},
							]}>
							<View style={{ justifyContent: 'center', flexDirection: 'row',justifyContent:'space-between' }}>
								<Text fontSize="md" style={{ color: '#fff' }}>
									<Text
										style={{
											fontSize: 16,
											color: '#fff',
											fontWeight: 'bold',
										}}>
										Animated Videos
									</Text>
								</Text>
								{selectedChapter && selectedChapter.video ? (
                        <MyIcon name="play" size={20} color="#fff" />
                      ) : (
                        !showDownload? 
						<MyIcon name="chevron-right" size={20} color="#fff" />:
                        <Text style={{fontSize: 12, color: '#fff'}}>
                          Downloading ...
                        {/* <Spinner color="#fff" /> */}
                        </Text>
                        )}

							</View>
						</TouchableOpacity>
						):null}
						<TouchableOpacity onPress={() => { 
							 props.navigation.navigate('Content', { title: title, data: selectedChapter });
							 setShowContent(false); 
					     }}
							style={[
								{
									backgroundColor: '#f58345',
									borderRadius: 10,
									marginTop: 10,
									padding: 15,
								},
							]}>
							<View style={{ justifyContent: 'center' , flexDirection: 'row',justifyContent:'space-between' }}>
								<Text fontSize="md" style={{ color: '#fff' }}>
									<Text
										style={{
											fontSize: 16,
											color: '#fff',
											fontWeight: 'bold',
										}}>
										Interactive Tasks
									</Text>
								</Text>
								<MyIcon name='chevron-right' style={{ color: '#fff' }} size={25} /> 



							</View>
						</TouchableOpacity>
					</View>
				</Actionsheet.Content>
			</Actionsheet>
		</Box>
	);
}
