import React from "react";
import { Modal, Alert } from "react-native";

import { useDispatch } from "react-redux";

import { NameModalView } from "./Common";
import { updateUserDetails } from "../../../store/userSlice";

export default function CustomePhoneModal(props) {
  const dispatch = useDispatch();

  const handleSubmition = async (text) => {
    if (text && text.length === 14) {
      await dispatch(updateUserDetails({ phone: text }));
      props.setPhoneModalVisible((state) => !state);
    } else {
      Alert.alert("Invalide Number");
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.phoneModalVisible}
      onRequestClose={() => {
        props.setPhoneModalVisible((state) => !state);
      }}
    >
      <NameModalView
        setModalVisible={props.setPhoneModalVisible}
        placeholder={
          props.phone === "Not Set" ? "Ex : +8801912345678" : props.phone
        }
        title="Phone"
        onPress={handleSubmition}
      />
    </Modal>
  );
}
