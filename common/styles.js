import { StyleSheet, Dimensions } from "react-native";

export const IMAGE_HEIGHT_SMALL = 0;
export const IMAGE_HEIGHT = 108;

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

export const colorTheme = {
  orange: {
    light: "#ef866b",
    medium: "#EF4C22",
    dark: "#9e3014",
    superDark: "#681703",
    almostBlack: "#420e01"
  },
  blue: {
    light: "#8EB3DF",
    medium: "#33409A",
    dark: "#262560"
  },
  white: {
    light: "#eeeeee",
    snow: "white"
  },
  green: {
    light: "#d6e685",
    medium: "#8cc665",
    dark: "#44a340",
    superDark: "#1e6823",
    almostBlack: "#103a13"
  },
  grey: {
    light: "#a9ada6",
    dark: "#585A56"
  },
  pink: {
    light: "#B776B2",
    dark: "#AE4787"
  },
  mint: {
    light: "#D4F2D2",
    medium: "#84A59D"
  },
  purple: {
    light: "#4F5DA9",
    medium: "#424DA0",
    dark: "#2E2F8E"
  }
};

export const pieColor = [
  colorTheme.orange.medium,
  colorTheme.pink.dark,
  colorTheme.mint.light,
  colorTheme.pink.light,
  colorTheme.mint.medium,
  colorTheme.blue.dark,
  colorTheme.purple.light,
  "#f2edd7",
  "#b87ca5",
  "#7c87b8",
  "#d7f2df",
  "#f1dd6a"
];

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorTheme.blue.medium
  },
  card: {
    width: 375,
    top: -10,
    backgroundColor: colorTheme.orange.medium,
    borderColor: colorTheme.white.snow,
    borderWidth: 2
  },
  initialLogoLocation: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -100
  },
  initialButtonLocation: {
    position: "absolute",
    bottom: 100
  },
  logo: {
    width: 150,
    height: 108,
    resizeMode: "contain"
  },
  animatedLogo: {
    width: 150,
    resizeMode: "contain"
  },
  logoLocation: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 100
  },
  linkLogoLocation: {
    justifyContent: "center",
    alignItems: "center"
  },
  homePageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorTheme.blue.medium
  },
  bluebutton: {
    backgroundColor: colorTheme.blue.dark,
    width: "100%"
  },
  orangebutton: {
    backgroundColor: colorTheme.orange.medium,
    height: 50,
    width: deviceWidth - 50,
    padding: 10,
    alignSelf: "center"
  },
  smallOrangeButton: {
    backgroundColor: colorTheme.orange.medium,
    width: "100%",
    height: 50
  },
  bugetSetupButton: {
    backgroundColor: colorTheme.orange.medium,
    width: "50%",
    height: 50
  },
  budgetOrangeButton: {
    backgroundColor: colorTheme.orange.medium,
    height: 50,
    marginVertical: 20,
    width: deviceWidth - 20,
    alignSelf: "center"
  },
  buttontext: {
    textAlign: "center",
    fontSize: 18
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    borderWidth: 8,
    borderColor: colorTheme.white.snow,
    overflow: "hidden",
    backgroundColor: colorTheme.orange.dark
  },
  circleLine: {
    borderBottomColor: colorTheme.white.snow,
    borderBottomWidth: 2,
    zIndex: 2
  },
  circleFill: {
    backgroundColor: colorTheme.orange.medium,
    width: "100%",
    bottom: 0,
    position: "absolute",
    zIndex: 1
  },
  cirleBigText: {
    color: colorTheme.white.snow,
    fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
    top: "35%",
    left: "20%",
    fontSize: 36,
    justifyContent: "center",
    alignItems: "center"
  },
  cirleSmallText: {
    color: colorTheme.white.snow,
    fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
    top: "50%",
    fontSize: 14,
    left: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: colorTheme.white.snow,
    fontWeight: "bold",
    position: "absolute"
  },
  questionContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: colorTheme.blue.medium
  },
  questionText: {
    alignSelf: "center",
    justifyContent: "center",
    color: colorTheme.white.snow,
    fontWeight: "bold",
    fontSize: 20,
    width: "80%"
  },
  questionButton: {
    width: 150,
    marginVertical: 10,
    paddingVertical: 13,
    alignSelf: "center"
  },
  slider: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },
  sliderTextAlign: {
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    justifyContent: "space-between"
  },
  sliderSmallText: {
    alignSelf: "center",
    color: colorTheme.white.snow,
    fontWeight: "bold",
    fontSize: 12
  },
  track: {
    height: 2,
    borderRadius: 1
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.35
  },
  dateText: {
    color: colorTheme.white.snow,
    fontWeight: "bold",
    position: "absolute",
    left: "67%",
    zIndex: 2
  },
  dateLine: {
    borderBottomColor: colorTheme.white.snow,
    borderBottomWidth: 1,
    position: "absolute",
    left: "30%",
    width: "50%",
    zIndex: 3
  },
  smallerText: {
    alignSelf: "center",
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16
  },
  editCategoryText: {
    fontFamily: "poppinsRegular",
    alignSelf: "center",
    color: "#000000",
    fontWeight: "bold"
  },
  editCategoryView: {
    paddingLeft: 20,
    paddingEnd: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  streakCardTextTitle: {
    color: colorTheme.white.snow,
    width: 300,
    marginLeft: 15,
    backgroundColor: colorTheme.orange.medium,
    fontWeight: "bold",
    top: 15
  },
  streakCard: {
    width: 300,
    height: 70,
    borderColor: colorTheme.white.snow,
    borderWidth: 2
  },
  streakCardText: {
    color: colorTheme.orange.medium,
    fontWeight: "bold",
    fontSize: 26,
    top: -15
  },

  streakCardsmallerText: {
    textAlign: "center",
    color: colorTheme.orange.medium,
    fontWeight: "bold",
    fontSize: 12,
    top: -15
  },
  streakCardTextAlign: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 10
  },
  homePageBudgetTextAlign: {
    flexDirection: "row",
    width: "100%",
    left: 40,
    justifyContent: "space-around",
    paddingTop: 10
  },
  homePageSmallText: {
    alignSelf: "center",
    color: colorTheme.white.snow,
    fontWeight: "bold",
    fontSize: 20
  },
  homePageSmallestText: {
    alignSelf: "center",
    color: colorTheme.white.snow,
    fontWeight: "bold",
    fontSize: 12
  },
  homePageQuiz: {
    alignSelf: "center",
    color: colorTheme.white.snow,
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 14
  },
  budgetSetupText: {
    fontFamily: "poppinsRegular",
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10,
    width: "80%",
    textAlign: "center"
  },
  budgetStatus: {
    fontWeight: "bold",
    color: colorTheme.white.snow,
    fontSize: 18,
    position: "absolute",
    top: 75
  },
  initialScreenText: {
    alignSelf: "center",
    color: colorTheme.white.snow,
    fontSize: 65,
    fontFamily: "poppinsExtraLight"
  },
  initialScreenTextSecondLine: {
    alignSelf: "center",
    color: colorTheme.white.snow,
    fontSize: 56,
    fontFamily: "poppinsExtraLight",
    position: "relative",
    top: -30
  },
  h1: {
    alignSelf: "center",
    color: colorTheme.white.snow,
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "poppinsExtraLight"
  },
  formContainer: {
    width: "80%",
    marginVertical: 10,
    height: 60,
    borderColor: colorTheme.orange.medium,
    backgroundColor: "#3947ad",
    borderWidth: 2,
    color: colorTheme.white.snow,
    fontSize: 18,
    paddingLeft: 20
  },
  budgetContainer: {
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 40
  },
  busgetSetupContainer: {
    width: deviceWidth - 40,
    position: "absolute",
    top: 50,
    alignItems: "center"
  },
  budgetInput: {
    padding: 10,
    width: "60%",
    height: 50,
    borderColor: colorTheme.orange.medium,
    backgroundColor: "#3947ad",
    borderWidth: 2,
    color: colorTheme.white.snow,
    fontSize: 18
  },
  accountOverviewContainer: {
    flexGrow: 1,
    backgroundColor: colorTheme.blue.medium
  },
  transactionContainerStyle: {
    backgroundColor: "white"
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.12)",
    backgroundColor: colorTheme.orange.medium
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 16,
    marginRight: 16
  },
  categoryPieContainer: {
    marginTop: 21,
    backgroundColor: colorTheme.white.snow
  },
  textContainer: {
    alignSelf: "center",
    position: "absolute",
    top: 275,
    left: 145
  },
  label: {
    fontSize: 18,
    marginTop: 5,
    color: colorTheme.white.snow
  },
  transactionTitle: {
    paddingLeft: 10,
    paddingVertical: 10,
    fontWeight: "700",
    backgroundColor: colorTheme.white.snow,
    color: colorTheme.grey.dark,
    fontSize: 18
  },
  transactionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%"
  },
  chart_title: {
    textAlign: "center",
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor: colorTheme.blue.medium,
    color: "grey",
    fontWeight: "bold"
  },
  slide: {
    height: 90,
    width: 300,
    backgroundColor: "white",
    marginVertical: 10,
    paddingVertical: 10,
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3
  },
  slideText: {
    alignItems: "center",
    color: colorTheme.grey.dark,
    fontWeight: "bold",
    fontSize: 16,
    padding: 5
  },
  slideImage: {
    alignSelf: "center",
    height: 60,
    width: 300,
    paddingTop: 2
  },
  publisherText: {
    textAlign: "left",
    fontSize: 12,
    fontWeight: "bold",
    color: colorTheme.grey.light
  },
  slidePublisher: {
    flexDirection: "row",
    paddingLeft: 5
  },
  viewArticleText: {
    textAlign: "left",
    paddingLeft: 5,
    fontSize: 12,
    fontWeight: "bold",
    color: colorTheme.orange.medium
  },
  barText: {
    padding: 0,
    margin: 0
  },
  dateTextCategory: {
    color: colorTheme.white.snow,
    fontWeight: "bold",
    position: "absolute",
    left: "55%",
    zIndex: 4
  },
  dateLineCategory: {
    borderBottomColor: colorTheme.white.snow,
    borderBottomWidth: 2,
    position: "absolute",
    zIndex: 3,
    width: "64%"
  },
  stackedBar: {
    backgroundColor: colorTheme.white.snow,
    padding: 5,
    position: "absolute",
    left: 10
  },
  picker: {
    width: 100
  },
  streakPicker: {
    width: 200
  },
  personalityImg: {
    justifyContent: "center",
    alignSelf: "center",
    position: "relative",
    height: 300,
    width: 350,
    borderWidth: 2,
    borderColor: colorTheme.blue.dark
  },
  setReminderHeaderText: {
    alignSelf: "center",
    justifyContent: "center",
    color: colorTheme.white.snow,
    fontWeight: "bold",
    fontSize: 20,
    width: "80%",
    paddingLeft: 60,
    marginBottom: 10
  },
  reminderIntervalSmallText: {
    alignSelf: "center",
    color: colorTheme.white.snow,
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5
  },
  personalityImgSmall: {
    alignSelf: "center",
    height: 150,
    width: 250,
    borderWidth: 1,
    borderColor: "white",
    marginTop: 20,
    marginBottom: 10
  },
  accountProfileButton: {
    backgroundColor: colorTheme.blue.dark,
    height: 50,
    width: deviceWidth - 130,
    padding: 10,
    alignSelf: "center"
  },
  headerStyle: {
    backgroundColor: colorTheme.blue.medium,
    borderBottomWidth: 0
  },
  transBody: {
    padding: 20
  },
  transDetail: {
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  transSpacing: {
    paddingRight: 10
  },
  transTextBold: {
    fontWeight: "bold",
    paddingRight: 5
  },
  editButton: {
    backgroundColor: colorTheme.orange.medium
  }
});
