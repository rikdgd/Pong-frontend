import Button from "@/components/Button";
import Textfield from "@/components/TextField";

export default function StylePreview() {
    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl mb-12">Style Preview</h1>
            <Button text="Button"/>
            <Textfield placeholder="enter text"/>
        </div>
    );
}