import React from "react";
import { Modal } from "react-native";

import { useDispatch } from "react-redux";

import { NameModalView } from "./Common";
import { updateUserDetails } from "../../../store/userSlice";

export default function CustomeNameModal(props) {
  const dispatch = useDispatch();

  const handleSubmition = async (text) => {
    if (text) {
      await dispatch(updateUserDetails({ name: text }));
      props.setNameModalVisible((state) => !state);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.nameModalVisible}
      onRequestClose={() => {
        props.setNameModalVisible((state) => !state);
      }}
    >
      <NameModalView
        setModalVisible={props.setNameModalVisible}
        placeholder={props.name}
        title="Name"
        onPress={handleSubmition}
      />
    </Modal>
  );
}
