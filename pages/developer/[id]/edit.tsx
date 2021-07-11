import {Fragment, useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Form from "../../../src/frontend/component/form";
import {useRouter} from "next/router";
import DeveloperService from "../../../src/frontend/service/developer";

const Edit = () => {
    const router: any = useRouter(),
        [developer, setDeveloper] = useState<any>();

    useEffect(() => {
        (async () => {
            if ('id' in router.query) {
                const result: any = await DeveloperService.fetch(parseInt(router.query.id));
                setDeveloper(result.data);
            }
        })();
    }, [router.query]);

    return (
        <Fragment>
            <Typography variant="h4">
                Editar
            </Typography>
            <Form {...{developer}}/>
        </Fragment>
    );
}

export default Edit
