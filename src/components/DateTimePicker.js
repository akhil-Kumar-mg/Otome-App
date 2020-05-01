import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePicker = (props) => {
    const { mode } = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(true);

    const hideDatePicker = () => {
        props.hideDateTimePicker();
        // setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        if (mode == 'time') {
            props.handleTimeInput(date);
        } else if (mode == 'date') {
            props.handleDateInput(date)
        }
        hideDatePicker();
    };

    return (
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={mode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
    );
};

export default DateTimePicker;