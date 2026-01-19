import React from "react";
import { Modal } from "react-native";

import { GenderModalView } from "./Common";

import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../../store/userSlice";

export default function CustomeGenderModal(props) {
  const dispatch = useDispatch();

  const handleSubmition = async (text) => {
    await dispatch(updateUserDetails({ gender: text }));
    props.setGenderNameModalVisible((state) => !state);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.genderModalVisible}
      onRequestClose={() => {
        props.setGenderNameModalVisible(!props.genderModalVisible);
      }}
    >
      <GenderModalView
        setGenderNameModalVisible={props.setGenderNameModalVisible}
        onPress={(item) => {
          handleSubmition(item);
        }}
      />
    </Modal>
  );
}
