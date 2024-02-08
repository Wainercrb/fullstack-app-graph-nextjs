"use client";

import { useEffect } from "react";
import Button from "@/ui/private/button";
import Input from "@/ui/private/input";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "@/graphql/auth";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;

    const data = {
      email: target.email.value,
      password: target.password.value,
    };

    signIn({ variables: data });
  };

  useEffect(() => {
    if (data && data.login) {
      redirect("/dashboard");
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <form className='md:w-1/2 w-full p-6' onSubmit={onSubmit}>
        <Input
          name='email'
          parentClass='mb-5'
          placeholder='name@flowbite.com'
          label='Your email'
        />
        <Input name='password' parentClass='mb-5' label='Your password' />
        <Button text='Submit' />
      </form>
    </div>
  );
}
