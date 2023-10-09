"use client"

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from '@mui/icons-material/School';
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled
} from "@mui/material";

import { useRouter } from "next/navigation";

const CustomListItemText = styled(ListItemText, {
})(() => ({
  ".MuiListItemText-primary": {
    color: "#1976d2"
  },
}));

export default function ListMenu() {
  const router = useRouter();

  return (
    <List component="nav">
      <ListItemButton onClick={() => router.push("/home")}>
        <ListItemIcon>
          <DashboardIcon sx={{ color: "#1976d2" }} />
        </ListItemIcon>
        <CustomListItemText primary="Painel Geral" />
      </ListItemButton>

      <Divider />
      <ListItemButton onClick={() => router.push("/universidades")}>
        <ListItemIcon>
          <SchoolIcon sx={{ color: "#1976d2" }} />
        </ListItemIcon>
        <CustomListItemText primary="Universidades" />
      </ListItemButton>

    </List>
  );

};