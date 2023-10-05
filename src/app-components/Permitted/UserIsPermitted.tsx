import React, { Fragment } from "react";
import { getUserInfo } from "utils/auth";

const UserIsPermitted = (props: { to: string; children: any }) => {
    const user = getUserInfo();

    return user.permissions.includes(props.to) ? <Fragment>{props.children}</Fragment> : <></>;
};

export default UserIsPermitted;
