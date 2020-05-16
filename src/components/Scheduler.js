import { Button, Container, Content, Icon, Item, Input } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from "../style/AppStyle";
import DateTimePicker from "./DateTimePicker";
import Toast from 'react-native-simple-toast';
import { addDateSchedule, addDaysSchedule, addIntervalSchedule } from '../api/ApiService';

class Scheduler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: {
        selectedDate: '',
        selectedTime: '',
        scheduleName: "",
        YYYYMMDDdate: ''
      },
      days: {
        selectedTime: '',
        scheduleName: "",
        mondaySelected: false,
        tuesdaySelected: false,
        wednesdaySelected: false,
        thursdaySelected: false,
        fridaySelected: false,
        saturdaySelected: false,
        sundaySelected: false,
        selectedDate: "",
        selectedDateArr: ['', '', '', '', '', '', '']
      },
      interval: {
        selectedTime: '',
        scheduleName: "",
        mondaySelected: false,
        tuesdaySelected: false,
        wednesdaySelected: false,
        thursdaySelected: false,
        fridaySelected: false,
        saturdaySelected: false,
        sundaySelected: false,
        intervalTimeHH: '',
        intervalTimeMM: '',
        intervalTimeSS: '',
        selectedDateArr: ['', '', '', '', '', '', '']
      },
      showTimePicker: false,
      showDatePicker: false,
      scheduleByDate: true,
      scheduleByDays: false,
      scheduleByInterval: false,
      shortCutName: this.props.shortCutName,
      shortCutId: this.props.shortCutId
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add a Schedule",
      headerStyle: {
        backgroundColor: colors.headerColor,
      },
      headerTintColor: colors.white,
    };
  };

  componentDidMount() {

  }

  formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  formatDate = (date) => {
    var d = new Date(date),
      day = '' + d.getDate(),
      year = d.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let month = monthNames[d.getMonth()];

    return day + this.nth(day) + " " + month + ", " + year;
  }

  nth = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  handleTimeInput = (date) => {
    if (this.state.scheduleByDays) {
      let tempState = this.state.days
      Object.assign(tempState, { selectedTime: this.formatAMPM(date) })
      this.setState({
        days: tempState
      })
    } else if (this.state.scheduleByDate) {
      let tempState = this.state.date;
      Object.assign(tempState, { selectedTime: this.formatAMPM(date) })
      this.setState({
        date: tempState
      })
    } else {
      let tempState = this.state.interval;
      Object.assign(tempState, { selectedTime: this.formatAMPM(date) })
      this.setState({
        interval: tempState
      })
    }

  }

  handleSubmit = () => {
    if (this.state.scheduleByDate) {
      const dateObj = this.state.date;
      if (dateObj.scheduleName.length == 0 || dateObj.selectedDate.length == 0 || dateObj.selectedTime.length == 0) {
        Toast.show("Please fill all the details")
        return
      }
      addDateSchedule(dateObj.scheduleName, "TEST", "1", dateObj.selectedTime.substr(0, dateObj.selectedTime.length - 3), dateObj.YYYYMMDDdate).then(res => {
        this.props.navigation.state.params.handleScheduleUpdate();
        Toast.show("Added Schedule Successfully")
      }).catch(error => {
        Toast.show("Adding Schedule Failed")

      })
    } else if (this.state.scheduleByDays) {
      const daysObj = this.state.days;
      if (daysObj.selectedTime.length == 0 || daysObj.scheduleName.length == 0 || daysObj.selectedDate.length == 0) {
        Toast.show("Please fill all the details")
        return;
      }
      addDaysSchedule(daysObj.scheduleName, "TEST", 1, daysObj.selectedTime.substr(0, daysObj.selectedTime.length - 3), daysObj.selectedDateArr).then(res => {
        this.props.navigation.state.params.handleScheduleUpdate();
        Toast.show("Added Schedule Successfully")
      }).catch(error => {
        Toast.show("Adding Schedule Failed")

      })
    } else {
      const intervalObj = this.state.interval;
      if (intervalObj.selectedTime.length == 0 || intervalObj.scheduleName.length == 0 ||
        intervalObj.intervalTimeHH.length == 0 || intervalObj.intervalTimeMM.length == 0 || intervalObj.intervalTimeSS.length == 0) {
        Toast.show("Please fill all the details")
        return;
      }
      if (intervalObj.intervalTimeHH.length != 2 && intervalObj.intervalTimeHH.length != 2 && intervalObj.intervalTimeHH.length != 2) {
        Toast.show("Invalid Interval time");
        return
      }
      addIntervalSchedule(intervalObj.scheduleName, "TEST", 1, intervalObj.selectedTime.substr(0, intervalObj.selectedTime.length - 3),
        intervalObj.selectedDateArr, intervalObj.intervalTimeHH + ":" + intervalObj.intervalTimeMM + ":" + intervalObj.intervalTimeSS).then(res => {
          this.props.navigation.state.params.handleScheduleUpdate();
          Toast.show("Added Schedule Successfully")
        }).catch(error => {
          Toast.show("Adding Schedule Failed")

        })
    }
  }

  handleDateInput = (date) => {
    let tempState = this.state.date;
    Object.assign(tempState, {
      selectedDate: this.formatDate(date),
      YYYYMMDDdate: this.formatDateToYYYYMMDD(date)
    })
    this.setState({
      date: tempState
    })
  }

  formatDateToYYYYMMDD = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  hideDateTimePicker = () => {
    this.setState({
      showDatePicker: false,
      showTimePicker: false
    })
  }
  updateSelectedDate = (date) => {
    let tempDateArr
    if (this.state.scheduleByDays) {
      tempDateArr = this.state.days.selectedDateArr;
    } else if (this.state.scheduleByInterval) {
      tempDateArr = this.state.interval.selectedDateArr;
    }
    let selectedDays = '';
    switch (date) {
      case 'Mon': tempDateArr[0].length ? tempDateArr[0] = '' : tempDateArr[0] = date; break;
      case 'Tue': tempDateArr[1].length ? tempDateArr[1] = '' : tempDateArr[1] = date; break;
      case 'Wed': tempDateArr[2].length ? tempDateArr[2] = '' : tempDateArr[2] = date; break;
      case 'Thu': tempDateArr[3].length ? tempDateArr[3] = '' : tempDateArr[3] = date; break;
      case 'Fri': tempDateArr[4].length ? tempDateArr[4] = '' : tempDateArr[4] = date; break;
      case 'Sat': tempDateArr[5].length ? tempDateArr[5] = '' : tempDateArr[5] = date; break;
      case 'Sun': tempDateArr[6].length ? tempDateArr[6] = '' : tempDateArr[6] = date; break;
    }
    for (let i = 0; i < tempDateArr.length; i++) {
      if (tempDateArr[i].length) {
        selectedDays = selectedDays + tempDateArr[i] + ", ";
      }
    }
    selectedDays = selectedDays.substring(0, selectedDays.length - 1);
    if (selectedDays.length == 34) {
      selectedDays = 'EveryDay';
    }
    if (this.state.scheduleByDays) {
      let tempState = this.state.days;
      Object.assign(tempState, {
        selectedDate: selectedDays,
        selectedDateArr: tempDateArr
      })
      this.setState({
        days: tempState
      })
    }
  }

  handleTextInput = (text) => {
    if (this.state.scheduleByDate) {
      const tempState = this.state.date;
      Object.assign(tempState, { scheduleName: text })
      this.setState({
        date: tempState
      })
    } else if (this.state.scheduleByDays) {
      const tempState = this.state.days;
      Object.assign(tempState, { scheduleName: text })
      this.setState({
        days: tempState
      })
    } else {
      const tempState = this.state.interval;
      Object.assign(tempState, { scheduleName: text })
      this.setState({
        interval: tempState
      })
    }

  }


  render() {
    let scheduleNameTxt = '';
    if (this.state.scheduleByDate) {
      scheduleNameTxt = this.state.date.scheduleName
    } else if (this.state.scheduleByDays) {
      scheduleNameTxt = this.state.days.scheduleName
    } else {
      scheduleNameTxt = this.state.interval.scheduleName
    }
    console.debug(this.state.interval)
    return (
      <Container style={styles.container}>
        <Content>
          <View style={{ flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop: 20 }}>
            <Button
              style={this.state.scheduleByDate ? [styles.scheduleTypeBtn, {
                borderTopLeftRadius: 6, borderBottomLeftRadius: 6,
                backgroundColor: colors.buttonColor,
                borderColor: colors.buttonColor
              }]
                : [styles.scheduleTypeBtn, {
                  borderTopLeftRadius: 6, borderBottomLeftRadius: 6,
                  backgroundColor: colors.white, borderColor: colors.buttonColor
                }]}
              onPress={() => this.setState({
                scheduleByDate: true,
                scheduleByDays: false,
                scheduleByInterval: false,
                days: {
                  selectedTime: '',
                  selectedDate: '',
                  scheduleName: "",
                  mondaySelected: false,
                  tuesdaySelected: false,
                  wednesdaySelected: false,
                  thursdaySelected: false,
                  fridaySelected: false,
                  saturdaySelected: false,
                  sundaySelected: false,
                  selectedDateArr: ['', '', '', '', '', '', '']
                },
                interval: {
                  selectedTime: '',
                  scheduleName: "",
                  mondaySelected: false,
                  tuesdaySelected: false,
                  wednesdaySelected: false,
                  thursdaySelected: false,
                  fridaySelected: false,
                  saturdaySelected: false,
                  sundaySelected: false,
                  intervalTimeHH: '',
                  intervalTimeMM: '',
                  intervalTimeSS: '',
                  selectedDateArr: ['', '', '', '', '', '', '']
                },
              })}
            >
              <Text style={this.state.scheduleByDate ? { color: colors.white, fontSize: 15 } :
                { color: colors.buttonColor, fontSize: 15 }}>Date</Text>
            </Button>
            <Button
              style={this.state.scheduleByDays ? [styles.scheduleTypeBtn, {
                backgroundColor: colors.buttonColor,
                borderColor: colors.buttonColor
              }]
                : [styles.scheduleTypeBtn, {
                  backgroundColor: colors.white, borderColor: colors.buttonColor
                }]}
              onPress={() => this.setState({
                scheduleByDate: false,
                scheduleByDays: true,
                scheduleByInterval: false,
                date: {
                  selectedDate: '',
                  selectedTime: '',
                  scheduleName: "",
                  YYYYMMDDdate: ''
                },
                interval: {
                  selectedTime: '',
                  scheduleName: "",
                  mondaySelected: false,
                  tuesdaySelected: false,
                  wednesdaySelected: false,
                  thursdaySelected: false,
                  fridaySelected: false,
                  saturdaySelected: false,
                  sundaySelected: false,
                  intervalTimeHH: '',
                  intervalTimeMM: '',
                  intervalTimeSS: '',
                  selectedDateArr: ['', '', '', '', '', '', '']
                }
              })}>
              <Text style={this.state.scheduleByDays ? { color: colors.white, fontSize: 15 } :
                { color: colors.buttonColor, fontSize: 15 }}>Days</Text>
            </Button>
            <Button
              style={this.state.scheduleByInterval ? [styles.scheduleTypeBtn, {
                backgroundColor: colors.buttonColor,
                borderTopRightRadius: 6, borderBottomRightRadius: 6,
                borderColor: colors.buttonColor
              }]
                : [styles.scheduleTypeBtn, {
                  borderTopRightRadius: 6, borderBottomRightRadius: 6,
                  backgroundColor: colors.white, borderColor: colors.buttonColor
                }]}
              onPress={() => this.setState({
                scheduleByDate: false,
                scheduleByDays: false,
                scheduleByInterval: true,
                date: {
                  selectedDate: '',
                  selectedTime: '',
                  scheduleName: ""
                },
                days: {
                  selectedTime: '',
                  selectedDate: '',
                  scheduleName: "",
                  mondaySelected: false,
                  tuesdaySelected: false,
                  wednesdaySelected: false,
                  thursdaySelected: false,
                  fridaySelected: false,
                  saturdaySelected: false,
                  sundaySelected: false,
                  selectedDateArr: ['', '', '', '', '', '', '']
                }
              })}>
              <Text style={this.state.scheduleByInterval ? { color: colors.white, fontSize: 15 } :
                { color: colors.buttonColor, fontSize: 15 }}>Interval</Text>
            </Button>
          </View>
          <View>
            {this.state.showTimePicker ? <DateTimePicker mode='time' hideDateTimePicker={this.hideDateTimePicker} handleTimeInput={this.handleTimeInput} /> : null}
            {this.state.showDatePicker ? <DateTimePicker mode='date' hideDateTimePicker={this.hideDateTimePicker} handleDateInput={this.handleDateInput} /> : null}
          </View>
          <View style={{ marginTop: 15 }}>
            <Item regular style={styles.inputBox}>
              <Input
                style={{ fontSize: 15, color: colors.buttonColor, fontWeight: "500", marginLeft: 5 }}
                placeholder="Enter schedule name..."
                placeholderTextColor={colors.buttonColor}
                value={scheduleNameTxt}
                onChangeText={this.handleTextInput}
              />
            </Item>
          </View>

          {this.state.scheduleByDays ? <Item regular style={styles.inputBox}>
            {this.state.days.selectedTime.length ? <Text style={{ fontSize: 20, marginLeft: 15, color: colors.buttonColor, fontWeight: "800" }} >{this.state.days.selectedTime}</Text>
              : <Text style={{ fontSize: 15, marginLeft: 10, color: colors.buttonColor }} >Select a Time</Text>
            }
            <Icon
              style={styles.icon}
              type="MaterialIcons"
              name="timer"
              onPress={() => this.setState({ showTimePicker: !this.state.showTimePicker })}
            />
          </Item> : null}
          {this.state.scheduleByDate ? <Item regular style={styles.inputBox}>
            {this.state.date.selectedTime.length ? <Text style={{ fontSize: 20, marginLeft: 15, color: colors.buttonColor, fontWeight: "800" }} >{this.state.date.selectedTime}</Text>
              : <Text style={{ fontSize: 15, marginLeft: 10, color: colors.buttonColor }} >Select a Time</Text>
            }
            <Icon
              style={styles.icon}
              type="MaterialIcons"
              name="timer"
              onPress={() => this.setState({ showTimePicker: !this.state.showTimePicker })}
            />
          </Item> : null}
          {this.state.scheduleByInterval ? <Item regular style={styles.inputBox}>
            {this.state.interval.selectedTime.length ? <Text style={{ fontSize: 20, marginLeft: 15, color: colors.buttonColor, fontWeight: "800" }} >{this.state.interval.selectedTime}</Text>
              : <Text style={{ fontSize: 15, marginLeft: 10, color: colors.buttonColor }} >Select a Time</Text>
            }
            <Icon
              style={styles.icon}
              type="MaterialIcons"
              name="timer"
              onPress={() => this.setState({ showTimePicker: !this.state.showTimePicker })}
            />
          </Item> : null}

          {this.state.scheduleByDate ? <Item regular style={styles.inputBox}>
            {this.state.date.selectedDate.length ? <Text style={{ fontSize: 18, marginLeft: 15, color: colors.buttonColor, fontWeight: "800" }} >{this.state.date.selectedDate} </Text>
              : <Text style={{ fontSize: 15, marginLeft: 10, color: colors.buttonColor }} >Select a Date </Text>
            }
            <Icon
              style={styles.icon}
              type="MaterialIcons"
              name="date-range"
              onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}
            />
          </Item> : null}
          {this.state.scheduleByInterval ?
            <View style={{
              flexDirection: "row", justifyContent: "center", marginLeft: 100,
              marginRight: 100, marginTop: 20
            }}>
              <Input placeholder="HH" placeholderTextColor={colors.headerColor}
                style={styles.timerInput}
                keyboardType={'numeric'}
                maxLength={2}
                onChangeText={(text) => {
                  let tempState = this.state.interval;
                  Object.assign(tempState, { intervalTimeHH: text })
                  this.setState({ interval: tempState });
                }} />
              {/* <Text style={{ fontSize: 18, color: colors.buttonColor }} > XX </Text> */}
              <Text style={{
                fontSize: 18, marginBottom: 20, color: colors.buttonColor
                , fontWeight: "300", fontSize: 30
              }} > : </Text>
              <Input placeholder="MM"
                placeholderTextColor={colors.headerColor}
                style={styles.timerInput}
                keyboardType={'numeric'}
                maxLength={2}
                onChangeText={(text) => {
                  let tempState = this.state.interval;
                  Object.assign(tempState, { intervalTimeMM: text })
                  this.setState({ interval: tempState });
                }} />
              <Text style={{
                fontSize: 18, marginBottom: 20, color: colors.buttonColor
                , fontWeight: "300", fontSize: 30
              }} > : </Text>
              <Input placeholder="SS"
                placeholderTextColor={colors.headerColor}
                style={styles.timerInput}
                keyboardType={'numeric'}
                maxLength={2}
                onChangeText={(text) => {
                  let tempState = this.state.interval;
                  Object.assign(tempState, { intervalTimeSS: text })
                  this.setState({ interval: tempState });
                }} />
            </View> : null}

          {this.state.scheduleByDays ? <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30, flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity style={this.state.days.mondaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.days;
                Object.assign(tempState, { mondaySelected: !this.state.days.mondaySelected })
                this.setState({ days: tempState }); this.updateSelectedDate("Mon")
              }}>
              <Text style={this.state.days.mondaySelected ? styles.activeDayText : styles.inactiveDayText}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.days.tuesdaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.days;
                Object.assign(tempState, { tuesdaySelected: !this.state.days.tuesdaySelected })
                this.setState({ days: tempState }); this.updateSelectedDate("Tue")
              }}>
              <Text style={this.state.days.tuesdaySelected ? styles.activeDayText : styles.inactiveDayText}>T</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.days.wednesdaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.days;
                Object.assign(tempState, { wednesdaySelected: !this.state.days.wednesdaySelected })
                this.setState({ days: tempState }); this.updateSelectedDate("Wed")
              }}>
              <Text style={this.state.days.wednesdaySelected ? styles.activeDayText : styles.inactiveDayText}>W</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.days.thursdaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.days;
                Object.assign(tempState, { thursdaySelected: !this.state.days.thursdaySelected })
                this.setState({ days: tempState }); this.updateSelectedDate("Thu")
              }}>
              <Text style={this.state.days.thursdaySelected ? styles.activeDayText : styles.inactiveDayText}>T</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.days.fridaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.days;
                Object.assign(tempState, { fridaySelected: !this.state.days.fridaySelected })
                this.setState({ days: tempState }); this.updateSelectedDate("Fri")
              }}>
              <Text style={this.state.days.fridaySelected ? styles.activeDayText : styles.inactiveDayText}>F</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.days.saturdaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.days;
                Object.assign(tempState, { saturdaySelected: !this.state.days.saturdaySelected })
                this.setState({ days: tempState }); this.updateSelectedDate("Sat")
              }}>
              <Text style={this.state.days.saturdaySelected ? styles.activeDayText : styles.inactiveDayText}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.days.sundaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.days;
                Object.assign(tempState, { sundaySelected: !this.state.days.sundaySelected })
                this.setState({ days: tempState }); this.updateSelectedDate("Sun")
              }}>
              <Text style={this.state.days.sundaySelected ? styles.activeDayText : styles.inactiveDayText}>S</Text>
            </TouchableOpacity>
          </View>
            : null}

          {this.state.scheduleByInterval ? <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30, flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity style={this.state.interval.mondaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.interval;
                Object.assign(tempState, { mondaySelected: !this.state.interval.mondaySelected })
                this.setState({ interval: tempState }); this.updateSelectedDate("Mon")
              }}>
              <Text style={this.state.interval.mondaySelected ? styles.activeDayText : styles.inactiveDayText}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.interval.tuesdaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.interval;
                Object.assign(tempState, { tuesdaySelected: !this.state.interval.tuesdaySelected })
                this.setState({ interval: tempState }); this.updateSelectedDate("Tue")
              }}>
              <Text style={this.state.interval.tuesdaySelected ? styles.activeDayText : styles.inactiveDayText}>T</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.interval.wednesdaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.interval;
                Object.assign(tempState, { wednesdaySelected: !this.state.interval.wednesdaySelected })
                this.setState({ interval: tempState }); this.updateSelectedDate("Wed")
              }}>
              <Text style={this.state.interval.wednesdaySelected ? styles.activeDayText : styles.inactiveDayText}>W</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.interval.thursdaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.interval;
                Object.assign(tempState, { thursdaySelected: !this.state.interval.thursdaySelected })
                this.setState({ interval: tempState }); this.updateSelectedDate("Thu")
              }}>
              <Text style={this.state.interval.thursdaySelected ? styles.activeDayText : styles.inactiveDayText}>T</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.interval.fridaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.interval;
                Object.assign(tempState, { fridaySelected: !this.state.interval.fridaySelected })
                this.setState({ interval: tempState }); this.updateSelectedDate("Fri")
              }}>
              <Text style={this.state.interval.fridaySelected ? styles.activeDayText : styles.inactiveDayText}>F</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.interval.saturdaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.interval;
                Object.assign(tempState, { saturdaySelected: !this.state.interval.saturdaySelected })
                this.setState({ interval: tempState }); this.updateSelectedDate("Sat")
              }}>
              <Text style={this.state.interval.saturdaySelected ? styles.activeDayText : styles.inactiveDayText}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.interval.sundaySelected ? styles.activeDayIcon : styles.inActiveDayIcon}
              onPress={() => {
                let tempState = this.state.interval;
                Object.assign(tempState, { sundaySelected: !this.state.interval.sundaySelected })
                this.setState({ interval: tempState }); this.updateSelectedDate("Sun")
              }}>
              <Text style={this.state.interval.sundaySelected ? styles.activeDayText : styles.inactiveDayText}>S</Text>
            </TouchableOpacity>
          </View>
            : null}

        </Content>
        <Button block style={styles.saveBtn}
          onPress={this.handleSubmit}>
          <Text style={styles.saveBtnTxt}>Save</Text>
        </Button>
      </Container >

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBG
  },
  heading: {
    flex: 1,
    color: colors.buttonColor,
    marginTop: 100,
    marginLeft: 20,
    fontSize: 25,
    fontWeight: "400"
  },
  inputBox: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    minHeight: 60,
    backgroundColor: colors.white
  },
  icon: {
    position: "absolute",
    right: 5,
    fontSize: 40,
    color: colors.buttonColor
  },

  activeDayIcon: {
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: colors.buttonColor,
    borderRadius: 50
  },
  inActiveDayIcon: {
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 50
  },
  activeDayText: {
    color: colors.white, fontSize: 20
  },
  inactiveDayText: {
    color: colors.buttonColor, fontSize: 20
  },
  saveBtn: {
    minHeight: 60,
    backgroundColor: colors.headerColor
  },
  scheduleTypeBtn: {
    borderWidth: 1,
    width: 80,
    height: 40,
    justifyContent: "center"
  },
  saveBtnTxt: {
    color: colors.white,
    fontSize: 20
  },
  timerInput: {
    borderColor: colors.white,
    borderBottomColor: colors.buttonColor,
    borderWidth: 3,
    backgroundColor: colors.white,
    fontSize: 23,
    color: colors.buttonColor
  }
})
export default Scheduler;