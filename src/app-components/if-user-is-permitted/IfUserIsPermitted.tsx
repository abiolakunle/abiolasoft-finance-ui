import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { getUserOrganizationInfo } from "utils/auth";

const IfUserIsPermitted = (props: { to: string; children: any }) => {
    const { organizationId } = useParams();
    const user = getUserOrganizationInfo(organizationId);

    return user.permissions.includes(props.to) ? <Fragment>{props.children}</Fragment> : <></>;
};

export default IfUserIsPermitted;
