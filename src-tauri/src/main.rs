// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//#[tauri::command]
//fn greet(name: &str) -> String {
//    format!("Hello, {}! You've been greeted from Rust!", name)
//}

fn main() {
    tauri::Builder::default()
        //.invoke_handler(tauri::generate_handler![greet])
        //.setup(|app| {
        //    match app.get_cli_matches() {
        //        // `matches` here is a Struct with { args, subcommand }.
        //        // `args` is `HashMap<String, ArgData>` where `ArgData` is a struct with { value, occurrences }.
        //        // `subcommand` is `Option<Box<SubcommandMatches>>` where `SubcommandMatches` is a struct with { name, matches }.
        //        Ok(matches) => {
        //            println!("{:?}", matches)
        //        }
        //        Err(_) => {}
        //    }
        //    Ok(())
        //})
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
