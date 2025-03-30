import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AssignMaterialForm from "./AssignMaterialForm"; // Import the form

const AssignMaterialDialog = ({ open, setOpen, courseId }) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-6 z-50">
          <div className="bg-n-4 rounded-lg p-4 shadow-xl w-3/4 relative">
            <Dialog.Title className="text-lg font-bold text-center">Upload Material</Dialog.Title>
            <Dialog.Description className="text-sm">
              Provide a title and upload a file.
            </Dialog.Description>
            {/* Pass setOpen to close the dialog when the form submits successfully */}
            <AssignMaterialForm closeModal={() => setOpen(false)} courseId={courseId}/>
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2">✖</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AssignMaterialDialog;
