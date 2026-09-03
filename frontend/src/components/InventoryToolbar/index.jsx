import { useRef } from "react";
import styles from "./Toolbar.module.css";

const InventoryToolbar = ({ search, setSearch, filter, setFilter, onImport, onExport }) => {
    
    const importInputRef = useRef(null);
    
    const handleImportClick = () => {
        if (importInputRef.current) {
            importInputRef.current.click();
        }
    };

    return (
        <div className= {styles.toolbar}>
            <div className= {styles.search}>
                <label className= {styles.searchLabel}>Search:</label>
                <input 
                type="text"
                className= {styles.searchInput}
                id="search-input"
                placeholder="Search Product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className= {styles.filter}>
                <select
                className={styles.filterSelect}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="phone">Phone</option>
                    <option value="console">Console</option>
                    <option value="computer">Computer</option>
                    <option value="tv">TV</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className= {styles.actions}>
                <input
                ref={importInputRef}
                type="file" 
                className= {styles.importInput}
                accept=".xlsx, .xls, .csv"
                onChange={onImport}
                />

                <button
                    type="button"
                    className={styles.actionButton}
                    onClick={handleImportClick}
                >
                    Import <i className="bi bi-upload"></i>
                </button>

                <button type="button" className={styles.actionButton} onClick={onExport}>
                    Export CSV <i className="bi bi-download"></i>
                </button>
                
            </div>
        </div>
    );
};

export default InventoryToolbar;