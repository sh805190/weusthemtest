import { StyleSheet } from "react-native";
import { button_width } from "./Dimensions";
import Colors from "./Colors";

const styles = StyleSheet.create({
  button: {
    width: button_width,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.hs_primary,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

const button = StyleSheet.create({
  primaryButton: {
    ...styles.button,
    backgroundColor: Colors.hs_primary,
  },
  primaryButtonText: {
    ...styles.buttonText,
    color: Colors.hs_gray_07,
  },
  secondaryButton: {
    ...styles.button,
    backgroundColor: "#92a8d1",
  },
  secondaryButtonText: {
    ...styles.buttonText,
    color: Colors.hs_primary,
  },
});

export { styles, button };
