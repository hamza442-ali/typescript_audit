"use client";

import {
  handleSupabaseError,
  handleSupabaseSuccess,
  useSupabase,
} from "@/app/components/supabaseProvider";
import { CustomTabPanel } from "@/app/components/tabs";
import Item from "@/components/TSDashboardGridItem";
import { Notification, UserProfile, UserProfileUpdate } from "@/lib/supabase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";

const PageContent = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const AccountTabContent = () => {
    const { data: session } = useSession();
    const formContext = useForm<any>({
      defaultValues: {
        ...session?.user,
      },
    });
    return (
      <Box>
        <Item>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Account
          </Typography>
          <FormContainer formContext={formContext}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  label={"Wallet Address"}
                  name={"address"}
                  type={"text"}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  label={"Profile ID"}
                  name={"profileId"}
                  type={"text"}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </FormContainer>
        </Item>
      </Box>
    );
  };

  const ProfileTabContent = () => {
    const { supabase, user } = useSupabase();
    const [profile, setProfile] = useState<any>(
      {} as UserProfileUpdate | UserProfile
    );

    const onSubmit = async (data: UserProfileUpdate) => {
      if (!supabase || !user) {
        handleSupabaseError("Database connection error - not logged in");
        return;
      }

      if (data.user_id) {
        delete data.id;
        delete data.user_id;
      }

      const { error } = await supabase
        .from("userprofiles")
        .update(data as UserProfileUpdate)
        .eq("user_id", user.id);
      if (error) {
        handleSupabaseError(error);
        return;
      } else {
        handleSupabaseSuccess("User Profile updated");
      }
    };

    const formContext = useForm<any>({
      defaultValues: {
        ...profile,
      },
    });

    useEffect(() => {
      const fetchProfile = async () => {
        if (!supabase || !user) return;
        const { data, error } = await supabase.rpc("upsert_profile", {
          identifier: user.id,
        });
        if (error) {
          handleSupabaseError(error);
        } else {
          setProfile(data[0]);

          formContext.reset(data[0]);
        }
      };

      fetchProfile();
    }, [supabase, user, formContext]);
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Profile
        </Typography>
        <FormContainer formContext={formContext} onSuccess={onSubmit}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Email"}
                name={"email"}
                type={"email"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Phone"}
                name={"phone"}
                type={"tel"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Family Name"}
                name={"family_name"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Middle Name"}
                name={"middle_name"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Given Name"}
                name={"given_name"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Address 1"}
                name={"address_1"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Address 2"}
                name={"address_2"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Country"}
                name={"country"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"City"}
                name={"city"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"State/Province"}
                name={"state_province"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Postal Code"}
                name={"postal_code"}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement
                label={"Biography"}
                name={"biography"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldElement label={"Website"} name={"website"} fullWidth />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </FormContainer>
      </Box>
    );
  };

  const NotificationsTabContent = () => {
    const { supabase, user } = useSupabase();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [displayOptions, setDisplayOptions] = useState({
      counteroffers: true,
      payments: true,
    });
    useEffect(() => {
      const fetchTransactions = async () => {
        if (!supabase || !user) return;
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
          .order("created_at", { ascending: false });
        if (error) {
          handleSupabaseError(error);
        } else {
          setNotifications(data);
        }
      };

      fetchTransactions();
    }, [supabase, user]);
    return (
      <Box>
        <Item>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Notifications
          </Typography>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Show</FormLabel>
            <FormGroup row={true} sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onChange={(e) => {
                      setDisplayOptions({
                        ...displayOptions,
                        counteroffers: e.target.checked,
                      });
                    }}
                  />
                }
                label="Counteroffers"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onChange={(e) => {
                      setDisplayOptions({
                        ...displayOptions,
                        payments: e.target.checked,
                      });
                    }}
                  />
                }
                label="Payments"
              />
            </FormGroup>
          </FormControl>
          {notifications.length ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 320 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Message</TableCell>
                    <TableCell align="right">Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notifications.map((notification) => {
                    if (
                      // return null if notification.content contains 'Counter offer' and counteroffers is false
                      !displayOptions.counteroffers &&
                      notification.content
                        ?.toLocaleLowerCase()
                        .includes("counter offer")
                    )
                      return null;

                    if (
                      // return null if notification.content contains 'Payment' and payments is false
                      !displayOptions.payments &&
                      notification.content
                        ?.toLocaleLowerCase()
                        .includes("payment")
                    )
                      return null;
                    return (
                      <TableRow
                        key={notification.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{notification.content}</TableCell>
                        <TableCell align="right">
                          {/* Format datetime */}
                          {new Date(notification.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No notifications found.</Typography>
          )}
        </Item>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Tabs for account page"
        >
          <Tab label="Profile" />
          <Tab label="Notifications" />
          <Tab label="Account" />
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        <ProfileTabContent />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <NotificationsTabContent />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
        <AccountTabContent />
      </CustomTabPanel>
    </Box>
  );
};

export default function PageComponent() {
  return <PageContent />;
}
