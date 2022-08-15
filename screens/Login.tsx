import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import LoginBottomSheet from "../components/LoginBottomSheetContent";
import PagerView from "react-native-pager-view";
import { signUpWithEmail } from "../authenticate";

const MIN_PASSWORD_LENGTH = 8;

const Login = (): ReactElement | null => {
  const [userName, setUserName] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const pagerViewRef = useRef<PagerView>(null);
  const [currentPagerViewIndex, setCurrentPagerViewIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] =
    useState<boolean>(false);

  const handleBottomSheetOpen = () => {
    bottomSheetRef.current.snapToIndex(0);
  };
  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const navigateToNextPagerView = (currentIndex: number): void => {
    pagerViewRef.current.setPage(currentIndex + 1);
  };

  const validateEmail = (input: string): boolean => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      return true;
    }
    return false;
  };

  const validateCreateAccountForm = (
    email: string,
    password: string,
    confirmPassword: string
  ): boolean => {
    if (!validateEmail(email)) {
      return false;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return false;
    }
    if (password != confirmPassword) {
      return false;
    }
    return true;
  };

  const displayInvalidFields = (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!validateEmail(email)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
    if (password != confirmPassword) {
      setInvalidConfirmPassword(true);
    } else {
      setInvalidConfirmPassword(false);
    }
  };

  const handleContinue = () => {
    if (!validateCreateAccountForm(email, password, confirmPassword)) {
      displayInvalidFields(email, password, confirmPassword);
    } else {
      signUpWithEmail(email, password);
    }
  };

  return (
    <View className="flex flex-col items-center h-full">
      <SafeAreaView className="flex-1 flex justify-center items-center space-y-4 w-full">
        <View className="h-full w-full">
          <PagerView
            ref={pagerViewRef}
            style={styles.container}
            initialPage={0}
            scrollEnabled={false}
            onPageSelected={(e) => {
              setCurrentPagerViewIndex(e.nativeEvent.position);
            }}
          >
            <View
              key={1}
              className="flex items-center justify-center space-y-4 p-6"
            >
              <Text className="text-2xl font-bold text-[#00034C]">
                How should we call you?
              </Text>
              <TextInput
                className="w-64 bg-gray-200 text-[#00034C] font-semibold text-2xl px-6 pb-1 h-16 mb-8 text-center"
                onChangeText={setUserName}
                value={userName}
              />
              <TouchableOpacity
                disabled={userName == ""}
                onPress={() => {
                  navigateToNextPagerView(currentPagerViewIndex);
                }}
              >
                <View
                  className={`p-4 bg-[#00034C] rounded-xl w-64 ${
                    userName == "" && "bg-gray-300"
                  }`}
                >
                  <Text className="text-lg text-white font-semibold text-center">
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              key={2}
              className="flex items-center justify-center space-y-4 p-6"
            >
              <Text className="text-2xl font-bold text-[#00034C] text-center mb-2">
                Create your account.
              </Text>
              <View className="w-11/12">
                <Text className="font-light pl-1 pb-0.5 text-[#00034C]">
                  Email {invalidEmail && "- must be a valid email address"}
                </Text>
                <TextInput
                  placeholder="user@example.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text.toLowerCase());
                  }}
                  className="w-full bg-gray-200 text-[#00034C] font-semibold text-lg px-6 pb-2 h-16"
                />
              </View>
              <View className="w-11/12">
                <Text className="font-light pl-1 pb-0.5 text-[#00034C]">
                  Password {invalidPassword && "- must be 8 characters/digits long"}
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  className="w-full bg-gray-200 text-[#00034C] font-semibold text-lg px-6 h-16"
                />
              </View>
              <View className="w-11/12">
                <Text className="font-light pl-1 pb-0.5 text-[#00034C]">
                  Confirm password {invalidConfirmPassword && "- must be same as password"}
                </Text>
                <TextInput
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  className="w-full bg-gray-200 text-[#00034C] font-semibold text-lg px-6 h-16 mb-2"
                />
              </View>
              <TouchableOpacity
                onPress={handleContinue}
              >
                <View
                  className={`p-4 bg-[#00034C] rounded-xl w-64 ${
                    !validateCreateAccountForm(
                      email,
                      password,
                      confirmPassword
                    ) && "bg-gray-300"
                  }`}
                >
                  <Text className="text-lg text-white font-semibold text-center">
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: "stretch" }}
                onPress={() => {}}
              >
                <View className="rounded-full bg-gray-200 border border-gray-300 p-3 flex flex-row items-center justify-center space-x-2">
                  <Ionicons name="phone-portrait-outline" size={30} />
                  <Text className="text-lg font-semibold">
                    Sign in with phone instead
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </PagerView>
        </View>
      </SafeAreaView>
      <View
        className="flex-none w-full border-t p-2 pb-10 border-gray-500 bg-gray-200"
        style={{ flexGrow: 0 }}
      >
        <Button
          title="Login with an existing account"
          color="#00034C"
          onPress={handleBottomSheetOpen}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        index={-1}
      >
        <LoginBottomSheet />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
