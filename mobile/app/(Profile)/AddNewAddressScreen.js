import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../Constant/Colors";
import CustomeFonts from "../../Constant/CustomeFonts";

import CustomeInput from "../../Components/DeliveryAddressScreen/CustomeInput";
import CustomeTopBar from "../../Components/DeliveryAddressScreen/CustomeTopBar";
import ButtomSaveButton from "../../Components/DeliveryAddressScreen/ButtomSaveButton";
import HomeOfficeButton from "../../Components/DeliveryAddressScreen/HomeOfficeButton";
import DefaultToggleButton from "../../Components/DeliveryAddressScreen/DefaultToggleButton";

import {
  addUserAddress,
  deleteUserAddress,
  updateUserAddress,
} from "../../store/userSlice";
import { useDispatch } from "react-redux";

export default function AddNewAddressScreen(props) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [region, setRegion] = useState();
  const [city, setCity] = useState();
  const [area, setArea] = useState();
  const [address, setAddress] = useState();
  const [office, setOffice] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [addressId, setAddressId] = useState();

  const [showError, setShowError] = useState(false);

  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params) {
      if (params.regionName) setRegion(params.regionName);
      if (params.cityName) setCity(params.cityName);
      if (params.areaName) setArea(params.areaName);

      if (params.EditItem) {
        let item = params.EditItem;
        if (typeof item === 'string') {
          try {
            item = JSON.parse(item);
          } catch (e) {
            console.error("Error parsing EditItem", e);
          }
        }
        setName(item.name);
        setPhone(item.phone);
        setRegion(item.region);
        setCity(item.city);
        setArea(item.area);
        setAddress(item.address);
        setAddressId(item._id);
        setOffice(item.office);
        if (item.defaultAddress) setDefaultAddress(true); // Assuming logic
      }
    }
  }, [params]);

  const customeItem = () => {
    return (
      <View style={styles.inputContainer}>
        <CustomeInput
          defaultValue={name ? name : null}
          setText={setName}
          placeholder="Full Name"
          showError={showError}
        />
        <CustomeInput
          defaultValue={phone ? phone : null}
          setText={setPhone}
          placeholder="Phone"
          showError={showError}
        />
        <CustomeInput
          defaultValue={region ? region : null}
          placeholder="Region"
          setText={setRegion}
          cutomeInput={true}
          onPress={() => router.push("/RegionScreen")}
          showError={showError}
        />
        <CustomeInput
          defaultValue={city ? city : null}
          placeholder="City"
          setText={setCity}
          cutomeInput={true}
          onPress={() => router.push("/RegionScreen")}
          showError={showError}
        />
        <CustomeInput
          defaultValue={area ? area : null}
          placeholder="Area"
          setText={setArea}
          cutomeInput={true}
          onPress={() => router.push("/RegionScreen")}
          showError={showError}
        />
        <CustomeInput
          defaultValue={address ? address : null}
          setText={setAddress}
          placeholder="Address"
          showError={showError}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <StatusBar backgroundColor={Colors.Primary_Helper} />
        <CustomeTopBar title="Add New Address" handleBack={() => router.replace("/DeliveryAddressScreen")} />
        {customeItem()}
        <HomeOfficeButton office={office} setOffice={setOffice} />
        <DefaultToggleButton
          defaultAddress={defaultAddress}
          setDefaultAddress={() => setDefaultAddress((state) => !state)}
        />
      </ScrollView>

      {addressId ? (
        <>
          <View style={styles.line}></View>
          <View style={styles.deleteContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                dispatch(deleteUserAddress(addressId));
                router.back();
              }}
            >
              <Text style={styles.deleteText}>Delete this address</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}

      <View style={styles.buttonContainer}>
        <ButtomSaveButton
          onPress={() => {
            if (name && phone && region && city && area && address) {
              const AddressObj = {
                name,
                phone,
                region,
                city,
                area,
                address,
                defaultAddress,
                office,
                addressId,
              };
              dispatch(updateUserAddress(AddressObj));
              router.replace("/DeliveryAddressScreen");
            } else {
              setShowError(true);
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray,
  },
  inputContainer: {
    backgroundColor: "white",
    marginTop: "16@vs",
    paddingHorizontal: "17@s",
    paddingVertical: "8@vs",
  },
  deleteContainer: {
    paddingVertical: "15@vs",
    backgroundColor: "white",
    alignItems: "center",
  },
  deleteText: {
    color: Colors.Primary,
    fontFamily: CustomeFonts.RobotoSlabSemiBold,
    fontSize: "12.5@s",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.LineColor,
  },
  buttonContainer: {
    backgroundColor: "white",
  },
});
