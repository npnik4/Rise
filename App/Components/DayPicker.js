
import React from "react"
import styles from "./DayPickerStyles";
import { Image, Text, TouchableOpacity, View } from "react-native"

class DayPicker extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            selectedDays: this.props.selectedDays
        }
    }

    componentDidMount() {

    }


    render() {
        return <View
            style={styles.daypickerView}>
            <View
                pointerEvents="box-none"
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                }}>
                <View
                    pointerEvents="box-none"
                    style={{
                        height: 36,
                        marginLeft: 14,
                        marginRight: 16,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <View
                        style={styles.daybuttonsuView}>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>
                            <TouchableOpacity
                                onPress={() => this.props.onDayPressed('Sunday')}
                                style={styles.ovalButton}>
                                {
                                    this.state.selectedDays.includes('Sunday') ?
                                        <Image
                                            source={require("./../../assets/images/DayButtonSU.png")}
                                            style={styles.ovalButtonImage} />
                                        :
                                        <Image
                                            source={require("./../../assets/images/UnDayButtonSU.png")}
                                            style={styles.ovalButtonImage} />

                                }
                            </TouchableOpacity>
                        </View>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>

                        </View>
                    </View>
                    <View
                        style={styles.daybuttonmView}>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>
                            <TouchableOpacity
                                onPress={() => this.props.onDayPressed('Monday')}
                                style={styles.ovalTwoButton}>
                                {
                                    this.state.selectedDays.includes('Monday') ?
                                        <Image
                                            source={require("./../../assets/images/DayButtonM.png")}
                                            style={styles.ovalTwoButtonImage} />
                                        :
                                        <Image
                                            source={require("./../../assets/images/UnDayButtonM.png")}
                                            style={styles.ovalTwoButtonImage} />

                                }
                            </TouchableOpacity>
                        </View>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>
                            {/* <Text
                                style={styles.mText}>M</Text> */}
                        </View>
                    </View>
                    <View
                        style={styles.daybuttontView}>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>
                            <TouchableOpacity
                                onPress={() => this.props.onDayPressed('Tuesday')}
                                style={styles.ovalThreeButton}>
                                {
                                    this.state.selectedDays.includes('Tuesday') ?
                                        <Image
                                            source={require("./../../assets/images/DayButtonT.png")}
                                            style={styles.ovalThreeButtonImage} />
                                        :
                                        <Image
                                            source={require("./../../assets/images/UnDayButtonT.png")}
                                            style={styles.ovalThreeButtonImage} />

                                }
                            </TouchableOpacity>
                        </View>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>

                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                        }} />
                    <View
                        style={styles.daybuttonthView}>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>
                            <TouchableOpacity
                                onPress={() => this.props.onDayPressed('Thrusday')}
                                style={styles.ovalFiveButton}>
                                {
                                    this.state.selectedDays.includes('Thrusday') ?
                                        <Image
                                            source={require("./../../assets/images/DayButtonTh.png")}
                                            style={styles.ovalFiveButtonImage} />
                                        :
                                        <Image
                                            source={require("./../../assets/images/UnDayButtonTh.png")}
                                            style={styles.ovalFiveButtonImage} />

                                }
                            </TouchableOpacity>
                        </View>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>

                        </View>
                    </View>
                    <View
                        style={styles.daybuttonfView}>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>
                            <TouchableOpacity
                                onPress={() => this.props.onDayPressed('Friday')}
                                style={styles.ovalSixButton}>
                                {
                                    this.state.selectedDays.includes('Friday') ?
                                        <Image
                                            source={require("./../../assets/images/DayButtonF.png")}
                                            style={styles.ovalSixButtonImage} />
                                        :
                                        <Image
                                            source={require("./../../assets/images/UnDayButtonF.png")}
                                            style={styles.ovalSixButtonImage} />

                                }
                            </TouchableOpacity>
                        </View>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>

                        </View>
                    </View>
                    <View
                        style={styles.daybuttonsView}>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>
                            <TouchableOpacity
                                onPress={() => this.props.onDayPressed('Saturday')}
                                style={styles.ovalSevenButton}>
                                {
                                    this.state.selectedDays.includes('Saturday') ?
                                        <Image
                                            source={require("./../../assets/images/DayButtonS.png")}
                                            style={styles.ovalSevenButtonImage} />
                                        :
                                        <Image
                                            source={require("./../../assets/images/UnDayButtonS.png")}
                                            style={styles.ovalSevenButtonImage} />

                                }
                            </TouchableOpacity>
                        </View>
                        <View
                            pointerEvents="box-none"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: "center",
                            }}>

                        </View>
                    </View>
                </View>
            </View>
            <View
                pointerEvents="box-none"
                style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                }}>
                <View
                    style={styles.daybuttonwView}>
                    <View
                        pointerEvents="box-none"
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            justifyContent: "center",
                        }}>
                        <TouchableOpacity
                            onPress={() => this.props.onDayPressed('Wednesday')}
                            style={styles.ovalFourButton}>
                            {
                                this.state.selectedDays.includes('Wednesday') ?
                                    <Image
                                        source={require("./../../assets/images/DayButtonW.png")}
                                        style={styles.ovalFourButtonImage} />
                                    :
                                    <Image
                                        source={require("./../../assets/images/UnDayButtonW.png")}
                                        style={styles.ovalFourButtonImage} />

                            }
                        </TouchableOpacity>
                    </View>
                    <View
                        pointerEvents="box-none"
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            justifyContent: "center",
                        }}>

                    </View>
                </View>
            </View>
        </View>
    }

}

export default DayPicker;