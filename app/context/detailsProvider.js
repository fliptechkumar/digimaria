import React, { useState, useEffect, useContext, createContext } from 'react';
import { getMethodCall, PostDataCall, Uploadfiles } from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase('maria_app.db', '1.0', '', 1);
export const detailsProvider = createContext();
//const navigation = React.useContext(NavigationContext);
import {Platform } from 'react-native';
// Provider component that wraps your app and makes table object ..
// ... available to any child component that calls useTable().

export function AllDetail({ children, ...props }) {
	const detail = useProvideDetail(props);
	return <detailsProvider.Provider value={detail}>{children}</detailsProvider.Provider>;
}

// Hook for child components to get the table object ...
// ... and re-render when it changes.

export const useDetailsAll = () => {
	return useContext(detailsProvider);
};

// Provider hook that creates table object and handles state

function useProvideDetail(props) {
	
	const [ loading, setLoading ] = useState(false);
	const [visible, setIsvisible] = useState(false);
	const [ userId, setUserId ] = useState(null);
	const [ success, setSuccess ] = useState(null);
	const [ error, setError ] = useState(false);
	const [ booksList, setBooksList ] = useState(null);
	const [ chapterList, setChapterList ] = useState([]);
	const [ contentsList, setContents ] = useState([]);
	const [ subjectContent, setSubjectContent ] = useState([]);
	const [ contentType, setContentType ] = useState({type:null,value:null});
	const [classList, setClassList] = useState([]);
	//const [ contentValue, setContentValue ] = useState(null);

	//Linked Classes
	const getLinkedClasses = async (userId) => {
		setLoading(true);
		let resource = 'linkedclass?';
		let filter='userid='+userId
		getMethodCall(resource, filter, LinkedClassesCallback, errorCallback);
	}

	const LinkedClassesCallback = async(data) => {
		if (data.errorCode==0){
			console.log('linkedClasses',data)
			setClassList(data.result);
		} else {
			//alert(data.Message);
			setClassList([])
		}
		setLoading(false);
	};


		/* MY BOOKS  */
		const getBooks = async (userId) => {
			setLoading(true);
			let resource = 'linkedsubjectsnew?';
			let filter='userid='+userId
			getMethodCall(resource, filter, BooksCallback, errorCallback);
		}
		
		const BooksCallback = async(data) => {
			if (data.errorCode==0){
				console.log('myBooks',data)
				setBooksList(data.result);
			} else {
				//alert(data.Message);
				alert('No Books Found Please Scan QR Code to get Books')
				setBooksList(null)
			}
			setLoading(false);
		};

		/* MY CHAPTERS  */
		const getChapters = async (subjectid) => {
			setLoading(true);
			let resource = 'linkedchapters?';
			let filter='subjectid='+subjectid
			getMethodCall(resource, filter, ChaptersCallback, errorCallback);
		}

		const getChaptersByClass = async (classid) => {
			setLoading(true);
			let resource = 'linkedchaptersbyclass?';
			let filter='classid='+classid
			getMethodCall(resource, filter, ChaptersCallback, errorCallback);
		}
		
		const ChaptersCallback = async(data) => {
			if (data.errorCode==0){
				console.log('myChapters',data)
				setChapterList(data.result);
			} else {
				setChapterList([])
				//alert(data.Message);
			}
			setLoading(false);
		};

		const getContents = async (chapterid) => {
			setLoading(true);
			let resource = 'chapter?';
			let filter='chapterid='+chapterid
			getMethodCall(resource, filter, ContentsCallback, errorCallback);
		}
		
		const ContentsCallback = async(data) => {
			if (data.errorCode==0){
				//console.log('contents',data)
				setContents(data.result[0].type);
			} else {
				setContents([])
			}
			setLoading(false);
		};
	/////Link Book Start ////
	
	const linkBook = async (userId,QRValues) => {
		setLoading(true);
		//trim QRValues
		QRValues = QRValues.trim();
		let resource = 'assignedlinknew?';
		let filter='userid='+userId+'&link='+QRValues
		getMethodCall(resource, filter,linkCallback, errorCallback);
	}

	const linkCallback = async(data) => {
		console.log('linkCallback',data)
		if (data.errorCode==0){
			console.log('token',data)
			setSuccess(true);
		} else {
			alert(data.Message);
			setError(true);
		}
		setLoading(false);
	};
	
		const errorCallback = (data) => {
			setLoading(false);
			console.log('errorCallback',data);
		};

		const getSubjectContent = async (classid) => {
			setLoading(true);
			let resource = 'contentlist?';
			let filter='classid='+classid
			getMethodCall(resource, filter, SubjectContentCallback, errorCallback);
		}

		const SubjectContentCallback = async(data) => {
			if (data.errorCode==0){
				console.log('subjectContent',data)
				setSubjectContent(data.result);
			} else {
				alert(data.Message);
			}
			setLoading(false);
		};

		const getChatersByTermORSem = async (classid,subjectid) => {
			setLoading(true);


			db.transaction(function (txn) {
				if(contentType.type=='term'){
				txn.executeSql('SELECT * FROM `Chapters` WHERE subjectid = '+subjectid+' AND classid = '+classid+' AND term = "'+contentType.value+'"', [], function (tx, res) {
					let data = [];
					for (let i = 0; i < res.rows.length; ++i) {
						data.push(res.rows.item(i));
						console.log('subjectid:', res.rows.item(i))
					}
					setChapterList(data);
					//setLocalChapterList(data);
				})
			} else {
				txn.executeSql('SELECT * FROM `Chapters` WHERE subjectid = '+subjectid+' AND classid = '+classid+' AND semester = "'+contentType.value+'"', [], function (tx, res) {
					let data = [];
					for (let i = 0; i < res.rows.length; ++i) {
						data.push(res.rows.item(i));
						console.log('subjectid:', res.rows.item(i))
					}
					setChapterList(data);
					//setLocalChapterList(data);
				})
			}
			})
			
			setLoading(false);

			// let resource = 'contentchapterlist?';
			// let filter='classid='+classid+'&subjectid='+subjectid+'&type='+contentType.type+'&typevalue='+contentType.value
			// getMethodCall(resource, filter, ChaptersCallback, errorCallback);
		}

		const ResetData = async () => {
			setContents([]);
			setChapterList([]);
			setSubjectContent([]);
		}
		const setLocalSubjectContent = async (data) => {
			setSubjectContent(data);
		}
		const setLocalChapterList = async (data) => {
			setChapterList(data);
		}
	
	// Return the user object and table methods
	return {
		loading,
		setLoading,
		getBooks,
		visible,
		setSuccess,
		success,
		linkBook,
		booksList,
		chapterList,
		getChapters,
		setChapterList,
		getContents,
		contentsList,
		setError,
		error,
		setSubjectContent,
		subjectContent,
		getSubjectContent,
		setContentType,
		contentType,
		getChatersByTermORSem,
		ResetData,
		setLocalSubjectContent,
		setLocalChapterList,
		getChaptersByClass,
		getLinkedClasses,
		classList

	};
}