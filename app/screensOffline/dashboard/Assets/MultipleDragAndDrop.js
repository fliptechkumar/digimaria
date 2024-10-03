import React, { useState, useEffect } from 'react';
import { Box, Button, Icon, useToast, View, Badge, Image } from 'native-base';

import { TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';

const { height, width } = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
	CardGradientComponent,
	HeaderComponent,
	SuccessModalComponent,
	SuccessModalActivityComponent,
} from '../../../components/component';
var Sound = require('react-native-sound');
import { playSound, playSoundIncorrect } from '../../../components/Functions';
const gestureRootViewStyle = { flex: 1 };

export default function DragandDrop(props) {
	const [correctAnswer, setCorrectAnswer] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [wrongAnswer, setwrongAnswer] = useState(false);
	const [activityCompleted, setActivityCompleted] = useState(false);
	const [checkAnswer, setCheckAnswer] = useState(null);	
	const [result, setResult] = useState([]);
	const [dragAnswer, setDragAnswer] = React.useState([]);
	const [questions, setQuestions] = useState([]);

	
		useEffect(() => {
			setQuestions(props.route.params.assets.questions);
			//alert(JSON.stringify(props.route.params.assets.questions))
		  }, []);



	const setSuccess = () => {
		
		
		if (questions.length - 1 > currentIndex) 
		{
			
			if(result && result.length == 2)
			{
				let indx = currentIndex + 1;
				setResult([]);
				setCurrentIndex(indx);
				setDragAnswer([]);
				//alert(indx);

			}
			//setCorrectAnswer(false);
		}else{
			//alert(result.length )
			if(result && result.length == 2)
			{
				setResult([]);
				setDragAnswer([]);	
				setActivityCompleted(true);
			}
			
		
		}
		
	};

	const CompletedActivity = () => {
		//setCurrentIndex(0);
		setActivityCompleted(false);
		props.navigation.goBack();
	};

	useEffect(() => {
		if(questions.length>0 && checkAnswer == null)
		{
			setCheckAnswer(questions[currentIndex].answer[0]);
		}
	}, []);

	useEffect(() => {
		if(result.length==2 && currentIndex<2)
		{
			//setResult([]);
			//setCurrentIndex(1);
			//alert(result.length);
			//setSuccess();
		}
	}, [result]);

	const LeftNav = () => {
		setDragAnswer([]);
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};
	const RightNav = () => {
		setDragAnswer([]);
		if (questions.length - 1 > currentIndex) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const ReceivingZoneUIComponent = (item, index, answer) => {

		return (
			<DraxView
				style={[styles.centeredContent, styles.receivingZone]}
				//receivingStyle={styles.receiving}
				renderContent={({ viewState }) => {
					const receivingDrag = viewState && viewState.receivingDrag;
					const payload = receivingDrag && receivingDrag.payload;
				
					return (
						
						<View style={styles.boxStyle} >
							<Image
								alt="image"
								resizeMode="contain"
								source={{ uri: 'file://'+item }}
								style={{ width: 220, height: 120, alignSelf: 'flex-start', marginLeft: 10 }}
							/>
							<View style={{ width: 60, height: 60, borderColor: '#ccc', borderWidth: 1, marginTop: 26, marginRight: 15 }}>
								<Text style={styles.textStyleQuestion}>{result.length > 0 && result.includes(answer) ? answer : null}</Text>
							</View>
						</View>
					
					);
				}}

				onReceiveDragDrop={({ dragged: { payload } }) => {
					console.log(`received ${payload}`);
					if(answer == payload)
					{
						setResult([...result, payload]);
						setDragAnswer([...dragAnswer, payload]);
						setCorrectAnswer(true);
						playSound();
						//setSuccess();
						//alert('Correct Answer');
						
					}else{
						setDragAnswer([...dragAnswer]);
						setwrongAnswer(true)
						playSoundIncorrect();
					}
				}}
			/>
		);
	};

	return (
		<Box flex="1">
			<HeaderComponent
				wrapperColor="#151218"
				bgColor="#273897"
				headerTitle={'More or Less ?'}
				nav={props.navigation}
				LeftContent={'goback'}
			/>

			<View style={{ padding: 10 }}>
				<Text style={{ fontSize: 18, color: '#3b8476', fontWeight: 'bold' }}>
					Drag and Drop <Text style={{color:'red'}}>(M)</Text> for more number  of objects and <Text style={{color:'red'}}>(L)</Text> for less number of objects
				</Text>
			</View>

			<View
				style={{
					minHeight: 480,
					marginTop:20
				}}>

				<GestureHandlerRootView style={gestureRootViewStyle}>
					<DraxProvider>
						<View style={styles.container}>
							<View style={styles.receivingContainer}>
								{
									questions.length>0 && questions[currentIndex].question.map((item, index) => ReceivingZoneUIComponent(item, index, questions[currentIndex].answer[index]))
								}
							</View>

							<View style={styles.draxListContainer}>
								{questions.length>0 && questions[currentIndex]?.options.map((item, index) => {
									if (dragAnswer.includes(item) == false) {
										return (
											<DraxView
												style={[styles.draggableBox, { marginBottom: 20 }]}
												draggingStyle={styles.dragging}
												dragReleasedStyle={styles.dragging}
												hoverDraggingStyle={styles.hoverDragging}
												dragPayload={item}
												longPressDelay={150}
												key={index}
												onDragStart={() => {
													console.log("start drag", item);
													//setAnswer(item.answer);
												}}
											>
												<Text style={styles.textStyle}>{item}</Text>
											</DraxView>
										);
									}
								})}

							</View>
						</View>
					</DraxProvider>
				</GestureHandlerRootView>

				<View style={{ marginTop: 10 }}>
					<View
						style={{
							height: 50,
							margin: 10,
							borderRadius: 5,
							shadowColor: '#0AB4B6',
							backgroundColor: '#f3f2f1',
							// margin:10,
							// padding:10,
							shadowOffset: { width: 0, height: 1 },
							shadowOpacity: 0.8,
							shadowRadius: 2,
							elevation: 5,
						}}>
						<View style={{ flexDirection: 'row', padding: 5 }}>
							<View style={{ flex: 1, flexDirection: 'row' }}>
								<Button
									onPress={() => LeftNav()}
									leftIcon={
										<Icon as={FontAwesomeIcon} name="chevron-left" size="lg" />
									}>
									<Text
										style={{
											fontSize: 16,
											fontStyle: 'italic',
											fontWeight: 'bold',
											color: '#fff',
										}}>
										Previous
									</Text>
								</Button>
							</View>
							<View style={{ flex: 1, justifyContent: 'center' }}>
								<Text
									style={{
										fontSize: 20,
										fontStyle: 'italic',
										color: '#000',
										fontWeight: 'bold',
										alignSelf: 'center',
									}}>
									{currentIndex + 1}/{questions.length}
								</Text>
							</View>

							<View style={{ flex: 1, alignItems: 'flex-end' }}>
								<Button
									onPress={() => RightNav()}
									endIcon={
										<Icon
											as={FontAwesomeIcon}
											name="chevron-right"
											size="lg"
											alignItems={'flex-end'}
										/>
									}>
									<Text
										style={{
											fontSize: 16,
											fontStyle: 'italic',
											fontWeight: 'bold',
											color: '#fff',
										}}>
										Next
									</Text>
								</Button>
							</View>
						</View>
					</View>
				</View>
			</View>

			<SuccessModalActivityComponent
				title={'Well Done!'}
				subTitle={'Correct Answer.Congratulations!'}
				okText={questions.length == currentIndex + 1 ? 'OK' : 'NEXT'}
				type={'Success'}
				isVisible={correctAnswer ? true : false}
				onPressOk={() => {
					setSuccess();
					setCorrectAnswer(false);
				}}
			/>

			<SuccessModalActivityComponent
				title={'No! Try again.'}
				subTitle={'Incorrect Answer.Please try again.'}
				type={'Error'}
				okText={'TRY AGAIN'}
				isVisible={wrongAnswer ? true : false}
				onPressOk={() => {
					setwrongAnswer(false);
				}}
			/>

			<SuccessModalActivityComponent
				title={'Congratulations !'}
				subTitle={''}
				type={'Success'}
				isVisible={activityCompleted ? true : false}
				okText={'OK'}
				onPressOk={() => {
					CompletedActivity();
				}}
			/>
		</Box>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		paddingTop: 0,
		justifyContent: "space-evenly",
	},
	centeredContent: {
		borderRadius: 10,
	},
	receivingZone: {
		//height: Dimensions.get("window").width / 4 - 12,
		borderRadius: 10,
		width: "99%", //(Dimensions.get('window').width / 4) - 12,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 5,
	},

	receiving: {
		borderColor: "red",
		borderWidth: 2,
	},

	draggableBox: {
		width: 100, //(Dimensions.get('window').width / 4) - 12,
		height: 40, //(Dimensions.get('window').width / 4) - 12,
		borderRadius: 6,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginRight: 5,
		backgroundColor: '#fff',

	},

	textStyleAnswer: {
		width: 100, //(Dimensions.get('window').width / 4) - 12,
		height: 40, //(Dimensions.get('window').width / 4) - 12,
		borderRadius: 6,
		backgroundColor: "#fff",
		color: "#000",
		fontSize: 18,
		padding: 5,
	},

	dragging: {
		opacity: 0.2,
	},

	hoverDragging: {
		borderColor: "magenta",
		borderWidth: 2,
	},

	receivingContainer: {
		width: "100%",
		flexDirection: "column",
		justifyContent: "space-evenly",
	},

	itemSeparator: {
		height: 15,
	},
	draxListContainer: {

		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: 'space-between',
		alignItems: "center",
		padding: 5,
		// height: 200,
	},
	receivingZoneContainer: {
		padding: 5,
		height: 100,
	},
	textStyle: {
		fontSize: 18,
		fontWeight: '500',

	},
	textStyleQuestion: {
		fontSize: 20,
		fontWeight: 'bold',
		width: '100%',
		textAlign: 'center',
		top:'25%'
		
		// color: "#ffffff",
	},
	dragAnswerStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#0AB4B6', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline', textDecorationColor: '#000'
	},
	boxStyle: {
		width: '100%', borderColor: '#ccc', borderWidth: 1, height: 120, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
		marginBottom:15
	}

});