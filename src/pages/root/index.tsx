import { useEffect, useState } from "react";
import { Box } from "../../components/ui/Box";
import { FlexBox } from "../../components/ui/FlexBox"
import { FormField } from "../../components/ui/form-field";

export const RootPage = () => {
    const [error, setError]= useState(false)
    useEffect(() => {
        const tm = setTimeout(() => {
            setError((p) => !p);

        }, 2000)
        return () => clearTimeout(tm)
    },[error])

    return (
      <Box fullPage>
        <FlexBox container center style={{ height: "100%" }}>
          <FlexBox direction="row" style={{outline: "1px rgb(200,200,200) solid", paddingTop: "1rem", gap: "1rem"}}>
            <FormField
              label={"Name"}
            />
            <FormField
              helperText={!error ? "Success!" : undefined}
              success={!error}
              label={"Name"}
            />
            <FormField
              placeholder="Nate"
              label={"Name"}
              error={!error}
              helperText={!error ? "Error!" : undefined}
            />
          </FlexBox>
        </FlexBox>
      </Box>
    );
}