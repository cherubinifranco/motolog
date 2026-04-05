import ExternalLink from "@/components/ui/ExternalLink";
import { BASIC } from "@/styles/basicStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PerfilScreen() {
  const [notificacionesActivas, setNotificacionesActivas] =
    React.useState(true);
  const [recordatoriosAuto, setRecordatoriosAuto] = React.useState(true);
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://imgs.search.brave.com/mRjZDmMPk5-_x7xtn8yvEi81lFJUhFFw3EeJg_JYU20/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/aS1zc3VjWDQ4UzRB/QUFBTS9taW5pb24t/c3RhcmUuZ2lm.gif",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>Cheru</Text>
          <Text style={styles.userEmail}>soy_cheru@gmail.com</Text>
          <Text style={styles.userMoto}>Honda CBR 600 RR • 15.234 km</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>

          <ExternalLink href="../mybikes" icon="bicycle" text="Mis Motos" />

          <TouchableOpacity style={[BASIC.littleShadow, styles.optionItem]}>
            <View style={styles.optionLeft}>
              <Ionicons name="calendar" size={24} color="#FF6200" />
              <Text style={styles.optionText}>Recordatorios</Text>
            </View>
            <Switch
              value={recordatoriosAuto}
              onValueChange={setRecordatoriosAuto}
              trackColor={{ false: "#DDD", true: "#FF6200" }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[BASIC.littleShadow, styles.optionItem]}>
            <View style={styles.optionLeft}>
              <Ionicons name="notifications" size={24} color="#FF6200" />
              <Text style={styles.optionText}>Notificaciones push</Text>
            </View>
            <Switch
              value={notificacionesActivas}
              onValueChange={setNotificacionesActivas}
              trackColor={{ false: "#DDD", true: "#FF6200" }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>

          <ExternalLink
            href="../bikes"
            icon="information-circle"
            text="Acerca de MotoLog"
          />
          <ExternalLink href="../bikes" icon="star" text="Calificar la app" />
          <ExternalLink
            href="../bikes"
            icon="share-social"
            text="Compartir con amigos"
          />
          <ExternalLink
            href="../bikes"
            icon="alert"
            text="Reportar un problema"
          />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Versión 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#FF6200",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#FF6200",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  userName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
  },
  userMoto: {
    fontSize: 15,
    color: "#FF6200",
    fontWeight: "600",
    marginTop: 6,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: "#111",
    fontWeight: "500",
  },
  optionValue: {
    fontSize: 15,
    color: "#666",
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 17,
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    marginTop: 30,
    color: "#999",
    fontSize: 13,
  },
});
