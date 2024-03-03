import Button from "../ui/button";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../ui/Input";
import {
  UpdateFormSchema,
  updateFormSchema,
} from "../../schema/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast } from "../../utils/toast";
import CrossIcon from "../icons/cross-icon";
import useToggle from "../../hooks/use-toggle";
import { updateProfileService } from "../../services/profile.service";

function UpdateProfileForm() {
  const { isOpen, open, close } = useToggle();

  const quertClient = useQueryClient();
  const { firstName, lastName }: any = quertClient.getQueryData(["profile"]);

  const updateProfileMutate = useMutation({
    mutationFn: updateProfileService,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateFormSchema>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });

  const onSubmit: SubmitHandler<UpdateFormSchema> = async (
    updateFormData: UpdateFormSchema
  ) => {
    try {
      await updateProfileMutate.mutateAsync(updateFormData);
      await quertClient.invalidateQueries({
        queryKey: ["profile"],
      });

      close();
    } catch (error) {
      showErrorToast("something went wrong");
    } finally {
      close();
    }
  };

  return (
    <>
      <Button onClick={open || updateProfileMutate.isPending} className="mt-6">
        Update Profile
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="form"
          className="relative z-10"
          onClose={() => {}}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className="flex justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Update Profile
                    </h3>
                    <button
                      type="button"
                      className="w-fit h-fit  text-gray-900"
                      disabled={updateProfileMutate.isPending}
                      onClick={close}
                    >
                      <CrossIcon />
                    </button>
                  </Dialog.Title>
                  <Dialog.Description className="mt-2">
                    <Input
                      type="text"
                      label="First Name"
                      error={errors.firstName?.message}
                      {...register("firstName")}
                    />

                    <Input
                      type="text"
                      label="Last Name"
                      error={errors.lastName?.message}
                      {...register("lastName")}
                    />
                  </Dialog.Description>

                  <div className="mt-4">
                    <Button
                      type="submit"
                      disabled={updateProfileMutate.isPending}
                    >
                      Update
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default UpdateProfileForm;
