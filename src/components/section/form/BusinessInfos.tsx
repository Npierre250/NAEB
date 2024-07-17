import classNames from "classnames";
import Input from "../../ui/Input";
import Dropzone from "react-dropzone";
import DocumentSVG from "../../vectors/DocumentSvg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { ApplicatioinContext } from "../../../context/Application";
import { applicationSchema } from "../../../types/zod";

const businessInfoSchema = z.object({
  tinNumber: z.string().min(1).max(50),
});

type ValidationSchema = z.infer<typeof businessInfoSchema>;

export default function BusinessInfos(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(businessInfoSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [{ files, error }, setDropzone] = useState<any>({
    files: props.licenceCopy,
    error: null,
  });

  const { next } = useContext(ApplicatioinContext);
  const [errorsMsg, setErrors] = useState({});
  const errorrArr = Object.entries(errorsMsg);

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    if (!files) {
      setDropzone({
        files: null,
        error: "Image is required.",
      });
      return;
    }

    props.updateFields({
      tinNumber: data.tinNumber,
      licenceCopy: files,
    });

    const validationResult = applicationSchema.safeParse({
      ...props,
      tinNumber: data.tinNumber,
      licenceCopy: files,
    });

    if (validationResult.success) {
      console.log("User object is valid:", validationResult.data);

      const formData = new FormData();
      formData.append("tinNumber", data.tinNumber);
      formData.append("licenceCopy", files[0]);

      // Append other necessary fields from props
      formData.append("idNumber", props.idNumber);
      formData.append("name", props.name);
      formData.append("email", props.email);
      formData.append("phoneNumber", props.phoneNumber);
      formData.append("farmLocation", props.farmLocation);
      formData.append("farmLength", props.farmLength);
      formData.append("productionSeason", props.productionSeason);
      formData.append("desiredProducts", props.desiredProducts);

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/applications`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Application created successfully:", result);
          next();
        } else {
          console.log("Error creating application:", result);
          setErrors(result.errors);
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        setErrors({ server: "Server error. Please try again later." });
      }
      finally{
        setIsLoading(false);
      }
    } else {
      setErrors(validationResult.error.flatten().fieldErrors);
      console.log("User object is invalid:", validationResult.error.flatten());
    }
  };

  return (
    <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Tin number"
        placeholder="Enter your TIN number"
        type="text"
        name="tinNumber"
        defaultValue={props.tinNumber}
        errors={errors}
        register={register}
      />
      <Dropzone
        onDrop={(acceptedFiles) => {
          setDropzone({
            files: acceptedFiles,
            error: null,
          });
        }}
      >
        {({ getRootProps, getInputProps, isDragAccept, isFocused }) => (
          <div>
            <label
              htmlFor="Export licence copy"
              className="block capitalize text-[17px] mb-1"
            >
              Export licence copy
            </label>
            <section
              className={classNames({
                "bg-[#E8E8EA] flex justify-center items-center h-[107px] rounded-2xl border transition-all cursor-pointer": true,
                "border-black": isDragAccept || isFocused,
                "border-red-500": error,
                "border-[#287BCB]": isDragAccept,
              })}
            >
              <div
                {...getRootProps({ defaultValue: props.licenceCopy })}
                className=" w-full h-full flex items-center flex-col justify-center"
              >
                <input {...getInputProps()} />
                {error ? (
                  <p className="text-red-500 text-sm text-center w-1/2">
                    {error}
                  </p>
                ) : (
                  <>
                    {files.length > 0 ? (
                      <div className="flex gap-2 items-center">
                        <DocumentSVG className="w-10" />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-[#287BCB] text-lg text-center">
                            {files[0].name}
                          </p>
                          <p className="text-sm">{files[0].size / 1000} KB</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-[#287BCB] text-lg text-center">
                          Browse file
                        </p>
                        <p className="text-center">Drag and drop</p>
                      </>
                    )}
                  </>
                )}
              </div>
            </section>
          </div>
        )}
      </Dropzone>
      {errorrArr.length > 0 && (
        <div
          className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3 mt-[2px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Errors in multi Step from</span>
          <div>
            <span className="font-medium">
              make sure that the following requirements are met:
            </span>
            <ul className="mt-0.5 ml-2 list-disc list-inside">
              {Object.entries(errorsMsg).map(([field, errorMessage]) => (
                <li key={field}>{`${errorMessage}`}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <button
        type="submit"
        className={classNames({
          "py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3":
            true,
          "opacity-100 ": !isLoading,
          "opacity-20 cursor-wait": isLoading,
        })}
      >
        Apply now
      </button>
    </form>
  );
}
