"use client";
import { userForm } from "@/lib/actions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";

const AccountForm = () => {
  const [state, formAction, pending] = useActionState(userForm, { name: "" });
  //   console.log(state);
  return (
    <div className="container">
      <form action={formAction}>
        {/* <Label htmlFor="name" />
        <p aria-live="assertive">{state?.error}</p>
        <Input type="text" defaultValue={state?.name} name="name" />
        <Button type="submit" variant={"destructive"}>
          {pending ? "...." : "submit"}
        </Button> */}
        {/* Field set */}
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="eg. Adom Containers (20 characters max)"
              />
              <FieldDescription>
                Choose a unique name for your product (item).
              </FieldDescription>
            </Field>
            {/* Instock */}
            <Field>
              <FieldLabel htmlFor="instock">Instock</FieldLabel>
              <Input
                id="instock"
                type="number"
                placeholder="200 (max:15 char)"
              />
              <FieldDescription>
                Enter quantity in storage (e.g., 199) excluding damaged ones.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button type="submit" variant={"destructive"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AccountForm;
