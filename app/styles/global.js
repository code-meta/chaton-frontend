import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  logo: {
    fontSize: 18,
    color: colors.primaryBlue,
    fontWeight: "500",
    fontFamily: "Jost-Medium",
  },

  navWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topIconWrapper: {
    flexDirection: "row",
    gap: 14,
    marginRight: -6,
  },

  topIcon: {
    fontSize: 24,
    color: colors.white,
  },

  notFoundMsg: {
    color: colors.gray,
    fontWeight: "500",
    lineHeight: 24,
  },

  defaultAvatarWrapper: {
    width: 48,
    height: 48,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },

  defaultAvatarText: {
    color: colors.dark,
    fontWeight: "700",
    fontSize: 20,
    textTransform: "capitalize",
  },

  chatsAvatar: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },

  chatsCartWrapper: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    gap: 20,
  },

  blobWrapper: {
    position: "absolute",
    top: "-25%",
    left: -84,
  },

  blob: {
    flex: 1,
    width: 556,
    height: 436,
    justifyContent: "center",
  },

  connect_cart_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  connect_cart_avatar_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  connection_cart_username: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },

  appBg: {
    backgroundColor: colors.dark,
  },

  displayHeight: {
    minHeight: height,
  },

  onboardingDisplay: {
    color: "white",
    fontSize: 40,
    fontFamily: "Lobster-Regular",
  },

  buttonPrimaryBg: {
    backgroundColor: colors.primaryBlue,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  buttonPrimaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  buttonSecondaryBg: {
    backgroundColor: "transparent",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.secondaryOrange,
  },

  buttonSecondaryText: {
    color: colors.secondaryOrange,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  buttonTertiaryBg: {
    backgroundColor: "transparent",
    // height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTertiaryText: {
    color: colors.secondaryOrange,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  buttonLinkBg: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryDark,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 50,
  },

  buttonLinkText: {
    color: colors.primaryBlue,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  textInput: {
    backgroundColor: colors.primaryBlueDark,
    borderColor: colors.primaryBlue,
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    color: colors.gray,
    paddingHorizontal: 12,
    fontSize: 14,
    marginTop: 10,
  },

  chatTextInput: {
    backgroundColor: colors.primaryBlueDark,
    borderColor: colors.primaryBlue,
    borderWidth: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 10,
    paddingVertical: 4,
    color: colors.white,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },

  sendBtnWrapper: {
    backgroundColor: colors.primaryBlue,
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  sendBtn: {
    fontSize: 24,
    color: colors.white,
  },

  emojiBtnWrapper: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
  },

  emojiBtn: {
    fontSize: 24,
    color: colors.gray,
  },

  textInputLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },

  eyeball: {
    position: "absolute",
    right: 0,
    top: 0,
    color: colors.gray,
    fontSize: 20,
    height: 40,
    width: 40,
    textAlignVertical: "center",
    textAlign: "center",
  },

  formTopOffset: {
    marginTop: 280,
    marginHorizontal: 24,
  },

  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },

  dividerLine: {
    backgroundColor: colors.primaryBlueDark,
    height: 1,
    flex: 5,
  },

  dividerText: {
    color: colors.gray,
    flex: 1,
    textAlign: "center",
  },

  uploadImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  uploadWrapper: {
    backgroundColor: colors.primaryBlueDark,
    width: 100,
    height: 100,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    top: -80,
    left: 100,
  },

  uploadIcon: {
    fontSize: 64,
    color: colors.gray,
    textAlign: "center",
  },

  uploadCamera: {
    fontSize: 28,
    color: colors.primaryBlue,
    textAlign: "center",
    position: "absolute",
    right: 0,
    bottom: 10,
  },

  uploadText: {
    color: colors.gray,
    textAlign: "center",
    marginTop: 30,
  },
});

export default styles;
